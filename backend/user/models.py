from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserInfo(AbstractUser):
    is_vehicle_owner = models.BooleanField(default=False)
    mobile_no = models.CharField(max_length=15,null=True)
    address = models.CharField(max_length=400, null=True)

    