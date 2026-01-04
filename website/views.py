from django.shortcuts import render, redirect
from . models import HomeTeamMember
# Create your views here.

def index(request):
    team = HomeTeamMember.objects.all()
    context = {"team":team,}
    return render(request, "website/index.html", context)

def about(request):
    return render(request, "website/about.html")

def contact(request):
    return render(request, "website/contact.html")

def service(request):
    return render(request, "website/service.html")

def blog(request):
    return render(request, "website/blog.html")