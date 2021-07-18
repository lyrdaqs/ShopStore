from django.urls import path
from base.views.product_views import product_list
from base.views.product_views import (
    product_detail,
    removeProduct,
    updateProduct,
    createProduct,
    uploadImage,
    createProductReview,
    getTopProducts,
    viewdProduct
    
)

urlpatterns = [
    path('', product_list, name=""),
    path('top/', getTopProducts, name=""),
    path('<int:pk>/', product_detail, name=""),
    path('<int:pk>/view/', viewdProduct, name=""),
    path('<int:pk>/remove/', removeProduct, name=""),
    path('<int:pk>/edit/', updateProduct, name=""),
    path('create/', createProduct, name=""),
    path('upload/', uploadImage, name=""),
    path('<int:pk>/review/', createProductReview, name=""),
]