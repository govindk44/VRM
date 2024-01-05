from rest_framework.serializers import ModelSerializer
from .models import UserInfo
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username
        if(user.is_superuser):
            token['user_type'] = "admin"
        elif(user.is_vehicle_owner):
            token['user_type'] = "vehicle_owner"
        else:
            token['user_type'] = "normal_user"
        # ...

        return token




class UserSerailizer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = UserInfo

    def create(self, validated_data):
        user = UserInfo.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            address = validated_data['address'],
            mobile_no = validated_data['mobile_no'],
        )

        try:
            user.is_vehicle_owner = validated_data['is_vehicle_owner']
        except:
            pass
        user.set_password(validated_data['password'])
        user.save()

        return user