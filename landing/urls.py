from django.urls import path

from landing import views

urlpatterns = [
    path("", views.index),
    path("cal-data/", views.calculate_median_income),
    path("phone/", views.get_phone),
]
