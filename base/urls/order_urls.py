from django.urls import path
from base.views.order_views import (
    addOrderItem,
    getOrderById,
    updateOrderToPaid,
    getUserOrders,
    getOrders,
    updateToDelivered
)

urlpatterns = [
    path('add/', addOrderItem, name=""),
    path('<int:pk>/', getOrderById, name=""),
    path('<int:pk>/pay/', updateOrderToPaid, name=""),
    path('myorders/', getUserOrders, name=""),
    path('', getOrders, name=""),
    path('<int:pk>/delivered/', updateToDelivered, name=""),
]