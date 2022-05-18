from django.db import models

# Create your models here.
class UserDetail(models.Model):
    user_type = models.CharField(max_length=50)
    age = models.BigIntegerField(null=True)
    family_number = models.BigIntegerField(null=True)
    median_income = models.IntegerField(null=True)
    median_income_value = models.IntegerField(null=True)
    result_img = models.ImageField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
class Welfare(models.Model):
    welfare_name = models.CharField(max_length=40)
    welfare_benefit = models.TextField(null=True)
    welfare_link = models.TextField(null=True)
    welfare_type = models.CharField(max_length=10, null=True)
    welfare_condition = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserPhone(models.Model):
    phone_number = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)