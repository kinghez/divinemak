from django.shortcuts import render

# Create your views here.
def product(request):
    return render(request, "shop/shop.html")

def product_detail(request):
    return render(request, "shop/product-page.html")

def cart(request):
    return render(request, "shop/cart.html")

def checkout(request):
    return render(request, "shop/checkout.html")