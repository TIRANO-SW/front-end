import json

from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, redirect

# Create your views here.
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

def index(request):
    return render(request, 'landing/index.html')