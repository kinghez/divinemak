from django.urls import path
from .import views

app_name = "shop"


urlpatterns = [
    path('shop/product/', views.product, name='product'),
    path('shop/detail/', views.product_detail, name='product_detail'),
    path('shop/cart/', views.cart, name='cart'),
    path('shop/checkout/', views.checkout, name='checkout'),
    
    ]
