from django.urls import path
from .views import recipe_create_list, RecipeRetrieveUpdateDestroy

urlpatterns = [
    path('recipes/', recipe_create_list, name='recipe_list'),
    path('recipes/<int:pk>/', RecipeRetrieveUpdateDestroy.as_view(), name='recipe_details'),
]
