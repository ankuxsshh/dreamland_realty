# Generated by Django 5.1 on 2024-11-25 10:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("dreamland_app", "0004_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="property",
            name="gallery_images",
        ),
        migrations.RemoveField(
            model_name="property",
            name="property_subtype",
        ),
        migrations.RemoveField(
            model_name="property",
            name="property_type",
        ),
        migrations.RemoveField(
            model_name="propertysubtype",
            name="property_type",
        ),
        migrations.DeleteModel(
            name="GalleryImage",
        ),
        migrations.DeleteModel(
            name="Property",
        ),
        migrations.DeleteModel(
            name="PropertySubtype",
        ),
        migrations.DeleteModel(
            name="PropertyType",
        ),
    ]
