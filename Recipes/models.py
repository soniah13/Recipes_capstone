from django.db import models
from cloudinary.models import CloudinaryField




# Create your models here.
class Recipe(models.Model):
    name = models.CharField(max_length=200)
    ingredients = models.TextField()
    procedure = models.TextField()
    prep_time = models.IntegerField()
    serving = models.IntegerField()
    secret = models.TextField(default='This is what i do differently')
    image = CloudinaryField('image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

