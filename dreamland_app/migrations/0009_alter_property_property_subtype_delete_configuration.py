# Generated by Django 5.1 on 2024-12-07 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dreamland_app', '0008_rename_bedrooms_property_bhk'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='property_subtype',
            field=models.CharField(choices=[('residential', [('villas', 'Villas'), ('apartments', 'Apartments'), ('independent_houses', 'Independent Houses'), ('residential_land', 'Residential Land')]), ('commercial', [('office', 'Office'), ('industries', 'Industries'), ('shopping_complexes', 'Shopping Complexes')]), ('agriculture', [('land', 'Land'), ('farm_houses', 'Farm Houses')])], max_length=255),
        ),
        migrations.DeleteModel(
            name='Configuration',
        ),
    ]