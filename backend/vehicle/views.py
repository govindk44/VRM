from django.shortcuts import render
from rest_framework import views, response, status
from .serializers import VehicleSerializer, BookingSerializer, VehicleTypeSerializer, VehiclePickupLocationSerializer
from .models import Booking as BookingModel, VehicleDetail as VehicleModel, VehicleType
# Create your views here.


class VehicleView(views.APIView):
    def get(self, request):
        records = VehicleModel.objects.all()
        serilizer = VehicleSerializer(records, many=True)
        return response.Response(serilizer.data, status=status.HTTP_200_OK)

    def post(self, request):
        postData = request.data
        serializer = VehicleSerializer(data=postData)
        if(serializer.is_valid()):
            serializer.save()
            return response.Response("Vehicle Added Successfully",status=status.HTTP_200_OK)
        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditVehicleView(views.APIView):
    def get(self, request, id):
        try:
            record = VehicleModel.objects.get(id=id)
            serializer = VehicleSerializer(record)
            return response.Response(serializer.data,status=status.HTTP_200_OK)
        except VehicleModel.DoesNotExist:
            return response.Response("Record Does Not Exist", status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,  request, id):
        postData = request.data
        try:
            record = VehicleModel.objects.get(id=id)
            serializer = VehicleSerializer(record, data=postData, partial= True)
            if(serializer.is_valid()):
                serializer.save()
                return response.Response("Edited Successfully",status=status.HTTP_200_OK)
            else:
                return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except VehicleModel.DoesNotExist:
            return response.Response("Record Does Not Exist", status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            record = VehicleModel.objects.get(id=id)
            
            bookings = BookingModel.objects.filter(vehicle__id=record.id).count()
            if(bookings > 0):
                return response.Response("you can't delete Vehicle, Vehicle has exist in Bookings", status=status.HTTP_200_OK)
           
            record.delete()
            return response.Response("Vehicle Deleted Successfully", status=status.HTTP_200_OK)
 
        except VehicleModel.DoesNotExist:
            return response.Response("Record Does Not Exist", status=status.HTTP_400_BAD_REQUEST)



class BookingView(views.APIView):
    def get(self, request):
        records = BookingModel.objects.all()
        serilizer = BookingSerializer(records, many=True)
        return response.Response(serilizer.data, status=status.HTTP_200_OK)

    # Get Booking
    def post(self, request):
        postData = request.data
        postData['booking_status'] = "Pending"
        serializer = BookingSerializer(data=postData)
        if(serializer.is_valid()):
            serializer.save()
            return response.Response("Please Wait for the confirmation from Vehicle Owner",status=status.HTTP_200_OK)
        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditBooking(views.APIView):
    def put(self, request, id, updatetype):
        try:
            booking = BookingModel.objects.get(id=id)
            vehicle = VehicleModel.objects.get(id = booking.vehicle.id)
            if(updatetype.lower() == "confirm"):
                booking.booking_status = "Confirmed"
                vehicle.status = "Booked"
            elif updatetype.lower() == "reject":
                booking.booking_status = "Rejected"
                vehicle.status = "Available"
            elif updatetype.lower() == "complete":
                booking.booking_status = "Available"
                vehicle.status = "Available"
            booking.save()
            vehicle.save()
            return response.Response(f"Booking has been {booking.booking_status}",status=status.HTTP_200_OK)
            
        except BookingModel.DoesNotExist:
            return response.Response("Record Does Not Exist", status=status.HTTP_400_BAD_REQUEST)

class GetBookingByUserId(views.APIView):
    def get(self, request, userid):
        bookings = BookingModel.objects.filter(booked_by = userid)
        serializer = BookingSerializer(bookings, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

class GetVehiclesByUserId(views.APIView):
    def get(self, request, userid):
        vehicles = VehicleModel.objects.filter(user__id = userid)
        serializer = VehicleSerializer(vehicles, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

class GetVehicleTypes(views.APIView):
    def get(self, request):
        vehiclesTypes = VehicleType.objects.all()
        serializer = VehicleTypeSerializer(vehiclesTypes, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

class GetOnlyAvaliableVehicles(views.APIView):
    def put(self, request):
        fromdate = request.data['from_date']
        todate = request.data['to_date']
        location = request.data['pickup_location']
        records = VehicleModel.objects.filter().exclude(id__in = BookingModel.objects.filter(from_time__gte=fromdate, to_time__lte = todate).values_list('vehicle', flat=True))
        records = records.filter(pickup_location__iexact = location)
        serilizer = VehicleSerializer(records, many=True)
        return response.Response(serilizer.data, status=status.HTTP_200_OK)
    
class GetPickupLocations(views.APIView):
    def get(self, request):
        vehicles = VehicleModel.objects.filter()
        serializer = VehiclePickupLocationSerializer(vehicles, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    
class GetVehicleBookingsByOwnerId(views.APIView):
    def get(self,request,id):
        vehicles = VehicleModel.objects.filter(user__id = id).values_list('id',flat=True)
        vehiclebookings = BookingModel.objects.filter(vehicle__id__in = vehicles)
        serializer = BookingSerializer(vehiclebookings,many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)