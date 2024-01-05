from django.urls import path
from .views import *
urlpatterns = [
    path("", UserView.as_view()),
    path("<int:id>", EditUserView.as_view()),
    
    path("vehicleowner", VehicleOwner.as_view()),
    path("vehicleowner/<int:id>", EditUserView.as_view()),
    path('changepassword', ChangePassword.as_view()),
]