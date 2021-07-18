from django.urls import path
from base.views.user_views import (
    MyTokenObtainPairView,
    getUserProfile,
    getAllUsers,registerUser,
    updateUserProfile,
    removeUser,
    updateUser,
    getUserById
)
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',getUserProfile, name=""),
    path('profile/update/',updateUserProfile, name=""),
    path('register/',registerUser, name=""),
    path('<int:pk>/remove/',removeUser, name=""),
    path('<int:pk>/',getUserById, name=""),
    path('<int:pk>/edit/',updateUser, name=""),
    path('',getAllUsers, name=""),
]