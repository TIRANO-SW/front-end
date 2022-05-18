import json

from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, redirect

from landing.models import UserDetail, Welfare, UserPhone

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
        work = request_body.get('work')
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
        work_deduction = deduct_work_income(request_body)
        
        property_deduction = deduct_property(request_body, location_dict)
        
        car_deduction = deduct_car_property(request_body)
        
        median_income_value = work_deduction + property_deduction + car_deduction
        median_income = int((median_income_value/median_income_100[family_number-1])*100)
        
        property = property_deduction + car_deduction
        bokji_data = get_bokji_data(median_income, age, work, property, family_number)
        save_data(request_body, median_income, median_income_value)
        
        data = {
            "nickname": nickname,
            "age": age,
            "familyNumber": family_number,
            "medianIncome": median_income,
            "incomeResult": median_income_value,
            "bokjiInfo": bokji_data
        }
        return JsonResponse(data)
        return JsonResponse({"test":"test"})
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
def get_phone_number(request):
    if request.method == "POST":
        request_body = json.loads(request.body)
        phone_number = request_body.get("phone")
        user_phone = UserPhone()
        user_phone.phone_number = phone_number
        user_phone.save()
        
        return JsonResponse(
            {
                "result": "success!"
            })
    return HttpResponseForbidden()


def save_data(request_body, median_income, median_income_value):
    bokji_type_dict = {
        "None": "없음",
        "facility": "아동시설퇴소 및 가정위탁보호 종료 5년 이내 청년",
        "recipient": "24세 이하 수급(권)자",
        "college": "24세 이하 대학생",
        "participation-income": "장애인 직업재활사업, 정신질환자 직업재활사업 참여자",
        "student": "25세 이상 초, 중, 고등학생",
        "75-elder": "75세 이상 노인",
        "handicapped": "등록장애인",
        "north": "북한이탈주민",
        "elder": "65세 이상 74세 이하 노인",
        "pregnant": "임신 중에 있거나 분만 후 6개월 미만의 여성",
        "soldier": "사회복무요원, 상근예비역",
        "intern": "행정기관 및 공공기관의 행정인턴(행정인턴 참여소득)"
    }
    bokji_type = request_body.get('bokji-type')
    
    user = UserDetail()
    user.user_type = bokji_type_dict[bokji_type]
    user.age = request_body.get('age')
    user.family_number = request_body.get('family-number')
    user.median_income = median_income
    user.median_income_value = median_income_value 
    user.save()
    
    return 0

def get_bokji_data(median_income, age, work, property, family_number):
    bokji_data_list =[]

    recommend_bokji_list = recommend_bokji(median_income, age, work, property, family_number)
    for bokji in recommend_bokji_list:
        print(bokji)
        welfare = Welfare.objects.get(welfare_name =bokji)
        bokji_data = {
            "bokjiName": welfare.welfare_name,
            "bokjiBenefit": welfare.welfare_benefit,
            "bokjiLink": welfare.welfare_link
        }
        print(bokji_data)
        bokji_data_list.append(bokji_data)
    print(bokji_data_list)
    return bokji_data_list


def recommend_bokji(median_income, age, work, property, family_number):
    recommend_bokji_list =[]
    if age < 45:
        if work < 3000000:
            recommend_bokji_list.append("국민내일배움카드")
        if (500000 < work <= 2000000) and (median_income < 100) and (19 < age <= 35):
            recommend_bokji_list.append("청년내일저축계좌")
        if (median_income < 50) and (15 < age < 40):
            recommend_bokji_list.append("청년내일저축계좌(차상위)")
    if ((15 < age < 70) and (median_income < 60) and (property <= 400000000)) or ((18 <= age < 35) and (median_income < 120)):
        recommend_bokji_list.append("국민취업지원제도 I유형")
    elif ((34 < age < 70) and (median_income < 100)) or (18 <= age < 35):
        recommend_bokji_list.append("국민취업지원제도 II유형")
    if family_number == 1:
        recommend_bokji_list.append("1인가구 지원사업")
    if 19 < age < 41:
        recommend_bokji_list.append("서울시 청년 마음건강사업")

    if len(recommend_bokji_list) < 5:
        recommend_bokji_list.append("무료 법률상담")
    elif len(recommend_bokji_list) > 5:
        print(f'복지리스트{recommend_bokji_list}\n')
        num = len(recommend_bokji_list) -5
        for i in range(num):
            recommend_bokji_list.pop()
        
        
    return recommend_bokji_list


def save_bokji_data():
    welfare_default_list = [
        {
            "welfare_name": "무료 법률상담",
            "welfare_benefit": "방문, 화상, 전화 법률 상담",
            "welfare_condition": "대한민국 국민",
            "welfare_link": "https://www.klac.or.kr/#",
            "welfare_type": "default"
        },
        {
            "welfare_name": "1인가구 지원사업",
            "welfare_benefit": "안전하고 건강한 사회적관계망 형성 지원",
            "welfare_condition": "1인가구",
            "welfare_link": "https://whatsnew.moef.go.kr/mec/ots/dif/view.do?comBaseCd=DIFPERCD&difPer1=DIFPER001&difSer=bcb920e1-068e-4671-8683-81a5be3ac58a&temp=2022&temp2=HALF001",
            "welfare_type": "default"
        },
        {
            "welfare_name": "서울시 청년 마음건강사업",
            "welfare_benefit": "자가검진도입 전문심리상담 서비스",
            "welfare_condition": "서울시에 거주, 만19세~39세 청년",
            "welfare_link": "https://www.hrd.go.kr/hrdp/gi/pgibo/PGIBO0100T.do",
            "welfare_type": "default"
        },
    ]
    
    welfare_list = [
        {
            "welfare_name": "국민내일배움카드",
            "welfare_benefit": "300만원, 최대 500만원 훈련비 지원",
            "welfare_condition": "연매출 1억 5천만원 미만, 월 급여 300만원 미만",
            "welfare_link": "https://www.hrd.go.kr/hrdp/gi/pgibo/PGIBO0100T.do"
        },
        {
            "welfare_name": "청년내일저축계좌",
            "welfare_benefit": "3년간 최대 1,080만 원 지원금 추가 납입",
            "welfare_condition": "만 15세 이상 ~ 만 39세 이하, 기준 중위소득 50% 이하, 가구재산 대도시 3.5억원 / 중소도시 2억원 / 농어촌 1.7억원 이하",
            "welfare_link": "https://www.gwanak.go.kr/site/gwanak/06/10609060900002022032905.jsp"
        },
        {
            "welfare_name": "청년내일저축계좌",
            "welfare_benefit": "3년간 최대 360만 원 지원금 추가 납입",
            "welfare_condition": "만 19세 이상 ~ 만 34세 이하, 기준 중위소득 100% 이하, 근로기준 월 50만원 초과 ~ 월 200만원 이하, 가구재산 대도시 3.5억원 / 중소도시 2억원 / 농어촌 1.7억원 이하",
            "welfare_link": "https://www.gwanak.go.kr/site/gwanak/06/10609060900002022032905.jsp"
        },
        {
            "welfare_name": "국민취업지원제도 I유형",
            "welfare_benefit": "구직촉진수당 최대 300만원 지급",
            "welfare_condition": "15~69세 가구단위 중위소득 60% 이하, 재산 4억원 이하 혹은 18~34세의 청년은 가구단위 중위소득 120% 이하",
            "welfare_link": "https://www.kua.go.kr/uapba010/selectSimulAsmtIntro.do"
        },
        {
            "welfare_name": "국민취업지원제도 II유형",
            "welfare_benefit": "취업활동 지원금 최대 25만원 지급",
            "welfare_condition": "18세~34세 구직자 혹은 35~69세 구직자 중 중위소득 100% 이하",
            "welfare_link": "https://www.kua.go.kr/uapba010/selectSimulAsmtIntro.do"
        },                               
    ]
    for welfare_dict in welfare_list:
        welfare = Welfare()
        welfare.welfare_name = welfare_dict["welfare_name"]
        welfare.welfare_benefit = welfare_dict["welfare_benefit"]
        welfare.welfare_condition = welfare_dict["welfare_condition"]
        welfare.welfare_link = welfare_dict["welfare_link"]
        welfare.save()
    
    for welfare_default_dict in welfare_default_list:
        welfare = Welfare()
        welfare.welfare_name = welfare_default_dict["welfare_name"]
        welfare.welfare_benefit = welfare_default_dict["welfare_benefit"]
        welfare.welfare_condition = welfare_default_dict["welfare_condition"]
        welfare.welfare_link = welfare_default_dict["welfare_link"]
        welfare.welfare_type = welfare_default_dict["welfare_type"]
        welfare.save()
    
    return 0