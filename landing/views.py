import json

from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render(request, 'landing/index.html')


def calculate_median_income(request):
    if request.method == "POST":
        request_body = json.loads(request.body)
        nickname = request_body.get('nickname')
        age = request_body.get('age')
        family_number = request_body.get('family-number')
        location = request_body.get('location')
        work = request_body.get('work')
        bokji_type = request_body.get('bokji-type')
        asset = request_body.get('asset')
        living = request_body.get('living')
        rent = request_body.get('rent')
        land = request_body.get('land')
        medical = request_body.get('medical')
        car = request_body.get('car')
        debt = request_body.get('debt')
        
        location_dict = {
            "big-city": {
                "living_deduction": 69000000,
                "living_property_limit": 120000000
            },
            "medium-city": {
                "living_deduction": 42000000,
                "living_property_limit": 90000000
            },
            "small-city": {
                "living_deduction": 35000000,
                "living_property_limit": 52000000
            }
        }

        # if bokji_type != "None":
        #     work_deduction = int(calculate_bokji_type(work,bokji_type))
        #     work_deduction_result = compare_default_deduct(work, work_deduction)
        # else:
        #     # 근로소득 기본공제 30%이기에 근로소득(work)에 0.7을 곱한 것이다.
        #     # work_deduction_result: 최종 소득평가액
        #     work_deduction_result = work*0.7
            
        return JsonResponse({
            "nickname": nickname,
            "age": age,
            "bokjiType": bokji_type,
            "location": location,
            "medianIncome": 109,
            "incomeResult": 2119000,
            "bokjiInfo":[
                {
                    "title": "국민취업지원제도",
                    "description": "test"
                }
            ]
        })
    return HttpResponseForbidden()

def calculate_bokji_type(work, bokji_type):
    if bokji_type == "participation-income":
        deduction_value = 200000    # 공제액
        deduction_rate = 0.5        # 공제액 공제 이후 추가 공제값
    elif (bokji_type == "recipient") | (bokji_type == "college"):
        deduction_value = 400000
        deduction_rate = 0.7
    elif bokji_type == "facility":
        deduction_value = 500000
        deduction_rate = 0.7
    elif (bokji_type == "student") | (bokji_type == "handicapped")|(bokji_type =="75-elder")|(bokji_type =="north"):
        deduction_value = 200000
        deduction_rate = 0.7
    elif (bokji_type == "elder") | (bokji_type == "pregnant") | (bokji_type == "soldier") | (bokji_type == "intern"):
        deduction_value = 0
        deduction_rate = 0.7
        
    work_deduction = (work-deduction_value)*deduction_rate
    return work_deduction


# 주거용 재산 공제 계산
def deduct_living_property(location, living, debt):
    living_conversion_rate = 0.014
    if location == "big-city":
        living_deduction = 69000000
        living_property_limit = 120000000
    elif location == "medium-city":
        living_deduction = 42000000
        living_property_limit = 90000000
    elif location == "small-city":
        living_deduction = 35000000
        living_property_limit = 52000000
    
    # if living > living_property_limit:

    result = (living-living_deduction-debt)*living_conversion_rate
    return result


# 기본 소득공제 30% 결과와 수급자 유형에 따른 공제액과 비교를 통해 
# 더 유리한 방향으로 적용되기에 비교하는 함수이다.
def compare_default_deduct(work, work_deduction):
    # 수급자의 경우 기본 소득공제 30%
    default_deduction = int(work*0.7)
    if default_deduction >= work_deduction:
        return work_deduction
    else:
        return default_deduction
    
# 일반형 재산 공제 계산
def deduct_general_property():
    return 0
