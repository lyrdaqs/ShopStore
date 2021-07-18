from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Product, Review, View
from rest_framework import status
from base.serializers import (ProductSerializer, ReviewSerializer)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def product_list(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products,8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = ProductSerializer(products,many=True)
    return Response({'products':serializer.data, 'page':page, 'pages':paginator.num_pages})


@api_view(['GET'])
def product_detail(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def viewdProduct(request, pk):
    product = Product.objects.get(_id=pk)
    existView = product.view_set.filter(user=request.user).exists()
    if existView == False:
        View.objects.create(
            user=request.user,
            product = product    
        )
    return Response('product viewed')



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def removeProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('product removed')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.countInStock = data['countInStock']

    product.save()
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data

    existReview = product.review_set.filter(user=user).exists()
    if existReview:
        message = {'detail':"product is already reviewed"}
        return Response(message, status.HTTP_400_BAD_REQUEST)

    if data['rating'] == 0:
        message = {'detail':"please select a rating"}
        return Response(message, status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            product = product,
            user = user,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for r in reviews:
            total += r.rating
        
        product.rating = total/len(reviews)
        product.save()

    return Response('review added')


@api_view(['GET'])
def getTopProducts(request):
    topProduct = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(topProduct,many=True)
    return Response(serializer.data)



