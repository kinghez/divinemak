from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages, auth

# Create your views here.

def register(request):
    if request.method == "POST":
        full_name = request.POST["fname"]
        email = request.POST["email"]
        phone_number = request.POST["phone_number"]
        username = request.POST["username"]
        password1 = request.POST["password1"]
        password2 = request.POST["password2"]
        if password1 == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, "email already exist")
                return redirect('account:register')
            elif User.objects.filter(phone_number=phone_number).exists():
                messages.info(request, "Phone Number already exist")
                return redirect("account:register")
            elif User.objects.filter(username=username).exists():
                messages.info(request, "usename already exist")
                return redirect("account:register")
            elif len(phone_number) != 11:
                messages.info(request, "phone number must be 11 digits")
                return redirect("account:register")
            else:
                user = User.objects.create_user(full_name=full_name, email=email,
                                                phone_number=phone_number, password=password1,
                                                username=username)
                user.save()
                return redirect("account:login")
        else:
            messages.info(request, "password must match")
            return redirect('account:register')
    

    return render(request, "account/register.html")


def login(request):
    if request.method == "POST":
        name = request.POST["name"]
        password = request.POST["password"]

        if "@" in name :
            user = User.objects.get(email=name)

        else:
            user = User.objects.get(phone_number=name)

        authenticated_user = auth.authenticate(username=user.username, password=password)

        if authenticated_user is not None :
            
            auth.login(request, authenticated_user)
            return redirect("website:index")
        else:
            messages.info(request, "Invalid credentials")
            return redirect("account:login")
        
    return render(request, "account/login.html")


def logout(request):
    auth.logout(request)
    return redirect("website:index")