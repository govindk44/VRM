from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserInfo
from django.utils.translation import gettext_lazy as _
# Register your models here.


class CustomerUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password','mobile_no','username' )}),
        (_('Personal info'), {'fields': ('first_name', 'last_name','address')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser','is_vehicle_owner')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
            
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ['id','username', 'email', 'first_name', 'last_name',"address", 'is_staff','is_staff', "is_superuser", "mobile_no","date_joined","is_active","is_vehicle_owner"]
    search_fields = ('id','email', 'first_name', 'last_name', 'username')
    ordering = ('email', )
   
admin.site.register(UserInfo, CustomerUserAdmin)