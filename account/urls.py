from django.urls import path
from .import views

app_name = "account"


urlpatterns = [
    path('account/register/', views.register, name='register'),
    path('account/login/', views.login, name='login'),
    path('account/logout/', views.logout, name='logout'),    
    ]