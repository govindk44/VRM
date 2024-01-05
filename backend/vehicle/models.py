from django.db import models
from user.models import UserInfo
# Create your models here.

def uploads(instance, filename):
    return 'images/vehicle/{instance.id}/{filename}'.format(filename=filename, instance = instance)
class VehicleType(models.Model):
    type = models.CharField(max_length=50) #['Bike', 'Scooter', 'Car']

class VehicleDetail(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='vehicle_creator')
    mileage = models.FloatField()
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE)
    brand_name = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100,null=True)
    pickup_location = models.CharField(max_length=100, null=True)
    rate_per_hour = models.IntegerField()
    free_kms = models.IntegerField(null=True)
    description = models.CharField(max_length=500, null=True)
    vehicle_image = models.ImageField(upload_to=uploads, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=30, null=True)

class Booking(models.Model):
    vehicle = models.ForeignKey(VehicleDetail, on_delete=models.CASCADE)
    booking_status = models.CharField(max_length=100) #[pending, confirmed, running, completed]
    booked_by = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='booked_user')
    from_time = models.DateTimeField()
    to_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


