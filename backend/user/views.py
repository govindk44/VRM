from django.shortcuts import render
from rest_framework import views,status,response
from .serializer import UserSerailizer
from .models import UserInfo
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import check_password
# Create your views here.


class UserView(views.APIView):
    
    def get(self, request):
        records = UserInfo.objects.all()
        serializer = UserSerailizer(records, many=True)
        return response.Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request):
        postData = request.data
        postData['address'] = None
        serializer = UserSerailizer(data=postData)
        if(serializer.is_valid()):
            serializer.save()
            return response.Response("Registered Successfully",status=status.HTTP_200_OK)
        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditUserView(views.APIView):

    def get(self, request, id):
        try:
            record = UserInfo.objects.get(id=id)
            serializer = UserSerailizer(record)
            return response.Response(serializer.data,status=status.HTTP_200_OK)
        except UserInfo.DoesNotExist:
            return response.Response("Record Does Not Exist", status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,  request, id):
        postData = request.data
        try:
            record = UserInfo.objects.get(id=id)
            serializer = UserSerailizer(record, data=postData, partial= True)
            if(serializer.is_valid()):
                serializer.save()
                return response.Response("Edited Successfully",status=status.HTTP_200_OK)
            else:
                return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserInfo.DoesNotExist:
            return response.Response("Record Does Not Exist", status=status.HTTP_400_BAD_REQUEST)
    
class VehicleOwner(views.APIView):
    def get(self, request):
        records = UserInfo.objects.filter(is_vehicle_owner = True)
        serializer = UserSerailizer(records, many=True)
        return response.Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request):
        postData = request.data
        postData['is_vehicle_owner'] = True
        serializer = UserSerailizer(data=postData)
        if(serializer.is_valid()):
            serializer.save()
            return response.Response("Vechile Owner Added Successfully",status=status.HTTP_200_OK)
        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePassword(views.APIView):
   def get(self, request):
        pass
   def post(self, request):
        # breakpoint()
        postData = request.data
        userId = postData['user_id']
        current_pass = postData['current_password']
        change_pass = postData['Change Password']
        conf_pass = postData['Confirm Password']
        conf_pass ={"password":change_pass}
        try:
            # breakpoint()
            user = UserInfo.objects.get(id=userId)
            if user.check_password(current_pass):
                # if change_pass == conf_pass:
                    user.set_password(change_pass)
                    user.save() 
                    return response.Response("Password Change Successfully", status=status.HTTP_200_OK)
                # else:
                    return response.Response("change password not matched",status=status.HTTP_200_OK) 
            else:
                return response.Response("current password is wrong try again",status=status.HTTP_200_OK)
        except:
            return response.Response("user not found" ,status=status.HTTP_200_OK)
