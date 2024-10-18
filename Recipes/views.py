from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework import generics, status
from .models import Recipe
from .serializers import RecipeSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
import base64
import cloudinary
import cloudinary.uploader

# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST'])
def recipe_create_list(request):
    if request.method == 'GET':
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        
        # Modify the image URLs in the serializer data
        for recipe in serializer.data:
            image_url = recipe.get('image')
            if image_url and 'image/upload/' in image_url:
                # Remove the 'image/upload/' prefix from the URL
                recipe['image'] = image_url.replace('image/upload/', '')
        
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # No need to upload the image if it is already a valid URL
        image_url = request.data.get('image')
        if image_url:
            request.data['image'] = image_url  # Use the provided image URL directly
        
        # Serialize the data and save the recipe
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class RecipeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]