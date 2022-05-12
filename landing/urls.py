from django.urls import path

from landing import views

urlpatterns = [
    path('',views.calculate_median_income),
]