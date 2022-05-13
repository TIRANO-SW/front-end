import json

from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, redirect

# Create your views here.
def calculate_median_income(request):
    if request.method == "POST":
        bokji_type = request.POST.get('living')
        # if bokji_type != "none":
            # calculate_bokji_type(request.POST.get(request.POST.get('work'),'bokji-type'))
        
        return redirect("/")
    return render(request, "landing/index.html")


def cal_median_income(request):
    if request.method == "POST":
        request_body = json.loads(request.body)
        print(request_body)
        return JsonResponse({
            "name": "aquashdw"
        })
    else:
        return HttpResponseForbidden()


# def calculate_bokji_type(income, bokji_type):
#     benefit_result = 0
#     if bokji_type == "participation-income":
#         income-200000
#         return benefit_result
#     elif bokji_type == "recipient":
#         return benefit_result
#     elif bokji_type == "college":
#         return benefit_result
#     elif bokji_type == "facility":
#         return benefit_result
#     elif bokji_type == "student":
#         return benefit_result
#     elif bokji_type == "handicapped":
#         return benefit_result
#     elif bokji_type == "elder":
#         return benefit_result
#     elif bokji_type == "pregnant":
#         return benefit_result
#     elif bokji_type == "soldier":
#         return benefit_result
#     elif bokji_type == "intern":
#         return benefit_result
#     else:
        

# 기본 소득공제 30% 결과와 수급자 유형에 따른 공제액과 비교를 통해 
# 더 유리한 방향으로 적용되기에 비교하는 함수이다.
def compare_default_deduct(income, benefit_result):
    # 수급자의 경우 기본 소득공제 30%
    default_deduction = int(income*0.7)
    if default_deduction >= benefit_result:
        return default_deduction
    else:
        return benefit_result
    
