from django.urls import path
from .views import *
urlpatterns = [
    path('', VehicleView.as_view()),
    path('<int:id>', EditVehicleView.as_view()),
    path('get/<int:userid>', GetVehiclesByUserId.as_view()),
    path('book/', BookingView.as_view()),
    path('book/<int:id>/<str:updatetype>', EditBooking.as_view()),
    path('book/<int:userid>', GetBookingByUserId.as_view()),
    path('available/', GetOnlyAvaliableVehicles.as_view()),
    path('types/', GetVehicleTypes.as_view()),
    path('pickup-locations', GetPickupLocations.as_view()),
    path('owner/booking/<int:id>',GetVehicleBookingsByOwnerId.as_view()), 
]