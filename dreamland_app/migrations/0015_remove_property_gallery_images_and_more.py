# Generated by Django 5.1 on 2025-01-16 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dreamland_app", "0014_propertyimage_description"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="property",
            name="gallery_images",
        ),
        migrations.RemoveField(
            model_name="property",
            name="main_image",
        ),
        migrations.RemoveField(
            model_name="property",
            name="price",
        ),
        migrations.AddField(
            model_name="property",
            name="property_images",
            field=models.ImageField(
                blank=True, null=True, upload_to="properties/images"
            ),
        ),
        migrations.AlterField(
            model_name="property",
            name="property_subtype",
            field=models.CharField(
                choices=[
                    ("villas", "Villas"),
                    ("apartments", "Apartments"),
                    ("independent_houses", "Independent Houses"),
                    ("residential_land", "Residential Land"),
                    ("office", "Office"),
                    ("industries", "Industries"),
                    ("shopping_complexes", "Shopping Complexes"),
                    ("farm_houses", "Farm Houses"),
                ],
                max_length=255,
            ),
        ),
        migrations.DeleteModel(
            name="PropertyImage",
        ),
    ]
