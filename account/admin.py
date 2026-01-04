from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = [
        'email', 'full_name', 'username', 'phone_number'
    ]

    list_filter = [
        "username", "email"
    ]

    search_fields = [
        "username", "email"
    ]

    ordering = [
        "-date_joined"
    ]

    fieldsets = UserAdmin.fieldsets + (
        ('Account Details', {
        'fields':('full_name', 'phone_number', 'address')
        }),
    )