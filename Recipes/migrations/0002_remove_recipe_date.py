# Generated by Django 5.1.2 on 2024-10-15 09:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Recipes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='date',
        ),
    ]
