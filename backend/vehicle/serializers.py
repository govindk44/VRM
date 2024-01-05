from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import VehicleDetail , Booking, VehicleType


class VehicleSerializer(ModelSerializer):
    added_by = SerializerMethodField('get_user_name')
    vehicle_type_name = SerializerMethodField('get_vehicle_type_name')
 
    class Meta:
        fields = "__all__"
        model = VehicleDetail

    def get_user_name(self, obj):
        return obj.user.first_name+" "+obj.user.last_name

    def get_vehicle_type_name(self, obj):
        return obj.vehicle_type.type

class VehiclePickupLocationSerializer(ModelSerializer):
   
    class Meta:
        fields = ['id', 'pickup_location']
        model = VehicleDetail

class BookingSerializer(ModelSerializer):
    vehicle_name = SerializerMethodField('get_vehicle_name')
    booking_by_name = SerializerMethodField('get_Booked_by')    


    def get_vehicle_name(self, obj):
        return obj.vehicle.brand_name +"/"+obj.vehicle.model_name

    
    def get_Booked_by(self, obj):
        return obj.booked_by.first_name +" "+obj.booked_by.last_name

    class Meta:
        fields = "__all__"
        model = Booking

class VehicleTypeSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = VehicleType