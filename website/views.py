from django.shortcuts import render, redirect
from . models import HomeTeamMember, ContactMessage
# Create your views here.

def index(request):
    team = HomeTeamMember.objects.all()
    context = {"team":team,}
    return render(request, "website/index.html", context)

def about(request):
    return render(request, "website/about.html")

def contact(request):
    if request.method == "POST":
        name = request.POST["name"]
        email = request.POST["email"]
        subject = request.POST["subject"]
        message = request.POST["message"]
        contact_message = ContactMessage(name=name, email=email, subject=subject, message=message)
        contact_message.save()

        return redirect("website:contact")

    return render(request, "website/contact.html")

def service(request):
    return render(request, "website/service.html")

def blog(request):
    return render(request, "website/blog.html")

