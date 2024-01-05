from django.contrib import admin
from .models import VehicleType
from .models import Booking
from .models import VehicleDetail
# Register your models here.

class BookingAdmin(admin.ModelAdmin):
    list_display=['vehicle','booking_status','booked_by','from_time','to_time','created_at','updated_at']

class VehicleDetailAdmin(admin.ModelAdmin):
     list_display=['user','mileage','vehicle_type','brand_name','model_name','pickup_location','rate_per_hour','free_kms','description','vehicle_image','created_at','updated_at','status']
class vehicleAdmin(admin.ModelAdmin):
     list_display=['type'] 

admin.site.register(VehicleType,vehicleAdmin)
admin.site.register(Booking,BookingAdmin)
admin.site.register(VehicleDetail,VehicleDetailAdmin)