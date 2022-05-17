import json

from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    if request.method == "POST":
        return redirect("/")
    return render(request, "landing/index.html")


def calculate_median_income(request):
    if request.method == "POST":
        request_body = json.loads(request.body)
        nickname = request_body.get("nickname")
        age = request_body.get("age")
        family_number = request_body.get("family-number")
        # 가구별 중위소득 100% 금액
        median_income_100 = [1944812, 3260085, 4194701, 5121080, 6024515, 6907004, 7780592, 8654180]
        # 도시별 기본공제액
        location_dict = {
            "big-city": {
                "living_deduction": 69000000,
                "living_property_limit": 120000000,
            },
            "medium-city": {
                "living_deduction": 42000000,
                "living_property_limit": 90000000,
            },
            "small-city": {
                "living_deduction": 35000000,
                "living_property_limit": 52000000,
            },
        }
        print(request_body)
        work_deduction = deduct_work_income(request_body)
        
        property_deduction = deduct_property(request_body, location_dict)
        
        car_deduction = deduct_car_property(request_body)
        
        income_result = work_deduction + property_deduction + car_deduction
        median_income = int((income_result/median_income_100[family_number-1])*100)
        
        
        return JsonResponse(
            {
                "nickname": nickname,
                "age": age,
                "familyNumber": family_number,
                "medianIncome": median_income,
                "incomeResult": income_result,
                "bokjiInfo": [
                    {
                        "title": "국민취업지원제도", 
                        "description": "test"
                    },
                ]
            }
        )
    return HttpResponseForbidden()



# 근로소득 및 사업소득에 대한 공제 계산
def deduct_work_income(request_body):
    bokji_type = request_body.get('bokji-type')
    work = request_body.get('work')
    medical = request_body.get("medical")
    default_deduction_rate = 0.7
    if work != None or 0:
        if bokji_type == "None":
            deduction_value = 0
            deduction_rate = default_deduction_rate
        elif bokji_type == "participation-income":
            deduction_value = 200000  # 공제액
            deduction_rate = 0.5  # 공제액 공제 이후 추가 공제값
        elif (bokji_type == "recipient" or "college"):
            deduction_value = 400000
            deduction_rate = 0.7
        elif bokji_type == "facility":
            deduction_value = 500000
            deduction_rate = 0.7
        elif (bokji_type == "student" or "handicapped" or "75-elder" or "north"):
            deduction_value = 200000
            deduction_rate = 0.7
        elif (bokji_type == "elder" or "pregnant" or "soldier" or "intern"):
            deduction_value = 0
            deduction_rate = 0.7

        work_deduction = (work - deduction_value) * deduction_rate
        if bokji_type != "None":
            work_deduction = compare_default_deduct(work, work_deduction)
        
        if medical != None:
            work_deduction -= medical
        # 음수면 0으로 처리
        if work_deduction < 0:
            work_deduction = 0
    else:
        work_deduction =0
    
    return work_deduction


# 기본 소득공제 30% 결과와 수급자 유형에 따른 공제액과 비교를 통해
# 더 유리한 방향으로 적용되기에 비교하는 함수이다.
def compare_default_deduct(work, work_deduction):
    # 수급자의 경우 기본 소득공제 30%
    default_deduction = int(work * 0.7)
    if default_deduction >= work_deduction:
        return work_deduction
    else:
        return default_deduction
    

# 주거용 재산 공제 계산
def deduct_living_property(living, location_deduction, debt):
    living_conversion_rate = 0.0104
    general_conversion_rate = 0.0417
    living_deduction = location_deduction["living_deduction"]
    living_property_limit = location_deduction["living_property_limit"]

    # 도시별 기본재산 공제액 + 부채: 재산에서 제외되는 총 금액
    total_deduction_value = living_deduction + debt

    if living > living_property_limit:
        result_general = living - living_property_limit * general_conversion_rate
        result_living = (living_property_limit - total_deduction_value) * living_conversion_rate
        if result_living < 0:
            total_deduction_value -= living_property_limit
        else:
            total_deduction_value = 0
            
        result = result_general + result_living
    else:
        result = (living - total_deduction_value) * living_conversion_rate
        if result < 0:
            total_deduction_value -= living
        else:
            total_deduction_value = 0
    
    if result < 0:
        result = 0
    return result, total_deduction_value

# 전월세 보증금, 임차금 재산 공제
def deduct_rent_property(rent, total_deduction_value):
    rent_correction_factor = 0.95
    
    result = (rent * rent_correction_factor) - total_deduction_value
    return result, total_deduction_value


# 일반형 재산 공제 계산
def deduct_general_property(land, total_deduction_value):
    result = (land - total_deduction_value) * 0.0417
    if result < 0:
        result = 0
        total_deduction_value -= land
    return result, total_deduction_value


# 금융 재산 공제 계산
def deduct_finance_property(asset, total_deduction_value):
    basic_deduction = 5000000
    result = (asset - basic_deduction - total_deduction_value) * 0.626
    if result < 0:
        result = 0
    return result

# 전체 재산 공제
def deduct_property(request_body, location_dict):
    location = request_body.get('location')
    asset = request_body.get("asset")
    living = request_body.get('living')
    rent = request_body.get('rent')
    debt = request_body.get('debt')
    land = request_body.get('land')
    location_deduction = location_dict[location]
    total_deduction_value = location_deduction["living_deduction"] + debt
    total_deduction = 0 

    if living != None or 0:
        living_deduction, total_deduction_value = deduct_living_property(living, location_deduction, debt)
        total_deduction += living_deduction
    if rent != None or 0:
        rent_deduction, total_deduction_value = deduct_rent_property(rent, total_deduction_value)
        total_deduction += rent_deduction
    if land != None or 0:
        general_deduction, total_deduction_value = deduct_general_property(land, total_deduction_value)
        total_deduction += general_deduction
    if asset != None or 0:
        finance_deduction = deduct_finance_property(asset, total_deduction_value)
        total_deduction += finance_deduction
        
    if total_deduction < 0: 
        total_deduction = 0
    return total_deduction


# 차량 공제 함수
def deduct_car_property(request_body):
    car = request_body.get("car")
    car_type = request_body.get("car-type")
    car_deduction_rate = 0.0417
    forwork_deduction_rate = 0.5
    if car != None:
        if car_type == "None":
            result = 0
        elif car_type == "normal":
            result = car
        elif car_type == "forWork":
            result = car * forwork_deduction_rate * car_deduction_rate
        elif car_type == "disabled" or "veteran":
            result = 0
        elif car_type == "under200-sedan" or "under200-van" or "under500-sedan" or "under500-van":
            result = car * car_deduction_rate
    else:
        result = 0
    
    return result


# 핸드폰 번호 받아오는 함수
def get_phone(request):
    if request.method == "POST":
        request_body = json.loads(request.body)
        phone = request_body.get("phone")
        print(request_body)
        return JsonResponse(
            {
                "phone": phone
            })
    return HttpResponseForbidden()
