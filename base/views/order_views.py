from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product, Order,OrderItem, ShippingAddress
from base.serializers import (ProductSerializer,OrderSerializer)
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItem(request):
    user = request.user
    data = request.data
    if len(data['orderItems']) == 0:  
        return Response({'detail':"no order item"},status.HTTP_400_BAD_REQUEST)
    else: 
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )

        shippingAddress = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country']
        )

        for i in data['orderItems']:
            product = Product.objects.get(_id=i['product'])
            OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )

            product.countInStock -= int(i['qty'])
            product.save()
    
    serializer = OrderSerializer(order,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    try:
        user = request.user
        order = Order.objects.get(_id=pk)
        if order.user == user or user.is_staff: 
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            message = {'detail':"Not autorized to view this page"}
            return Response(message, status.HTTP_400_BAD_REQUEST)

    except:
        message = {'detail':"order is not exist"}
        return Response(message, status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.atPaid = datetime.now()
    order.save()
    return Response("Order was paid")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserOrders(request):
    user = request.user
    orders = user.orders.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateToDelivered(request, pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('order was delivered')
