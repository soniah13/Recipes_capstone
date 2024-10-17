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
        return Response(serializer.data)
    
    elif request.method == 'POST':
        image_data = request.data.get('image')
        if image_data:
            try:
                # Check if the image has the base64 prefix and split properly
                if ',' in image_data:
                    encoded = image_data.split(',', 1)[1]
                else:
                    encoded = image_data
                
                # Decode the base64 image
                image = base64.b64decode(encoded)
                
                # Upload the image to Cloudinary
                cloudinary_response = cloudinary.uploader.upload(image, resource_type='image')
                
                # Get the secure URL of the uploaded image
                image_url = cloudinary_response.get('secure_url')
                
                # Set the image URL back to the request data
                request.data['image'] = image_url
            
            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
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