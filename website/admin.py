from django.contrib import admin
from . models import AboutImages, HomeServiceCard, HomeProjectLoader,HomeWhyChooseUs,HomeFaq,HomeOurPackages, HomeTeamMember,HomeTestimonial,ContactMessage


# Register your models here.

@admin.register(AboutImages)
class AboutImagesAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_image', 'second_image')

@admin.register(HomeServiceCard)
class HomeServiceCardAdmin(admin.ModelAdmin):
    list_display = ('id', 'icon', 'title', 'description')

@admin.register(HomeProjectLoader)
class HomeProjectLoaderAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'delay', 'stop', 'duration', 'speed')

@admin.register(HomeWhyChooseUs)
class HomeWhyChooseUsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'short_description', 'feature_icon', 'feature_title', 'feature_description') 

@admin.register(HomeOurPackages)
class HomeOurPackagesAdmin(admin.ModelAdmin):
    list_display = ('id', 'package_name')

@admin.register(HomeTeamMember)
class HomeTeamMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'position', 'image', 'facebook', 'twitter', 'linkedin', 'youTube')

@admin.register(HomeFaq)
class HomeFaqAdmin(admin.ModelAdmin):   
    list_display = ('id', 'question', 'answer')

@admin.register(HomeTestimonial)
class HomeTestimonialAdmin(admin.ModelAdmin):   
    list_display = ('id', 'client_name', 'client_position', 'client_image', 'feedback')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')

