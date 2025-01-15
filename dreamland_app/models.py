from django.db import models

STATUS_CHOICES = [
    ('available', 'Available'),
    ('sold', 'Sold'),
]

PROPERTY_TYPE_CHOICES = [
    ('residential', 'Residential'),
    ('commercial', 'Commercial'),
]

PROPERTY_SUBTYPE_CHOICES = {
    'residential': [
        ('villas', 'Villas'),
        ('apartments', 'Apartments'),
        ('independent_houses', 'Independent Houses'),
        ('residential_land', 'Residential Land'),
    ],
    'commercial': [
        ('office', 'Office'),
        ('industries', 'Industries'),
        ('shopping_complexes', 'Shopping Complexes'),
        ('farm_houses', 'Farm Houses')
    ],
}

class Property(models.Model):
    property_name = models.CharField(max_length=255)
    property_location = models.CharField(max_length=255)
    bhk = models.IntegerField()
    square_feet = models.IntegerField()
    possession_date = models.DateField()
    property_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    property_description = models.TextField()
    short_description = models.TextField()
    property_images = models.ImageField(upload_to='properties/images', blank=True, null=True)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPE_CHOICES)
    property_subtype = models.CharField(max_length=255, choices=PROPERTY_SUBTYPE_CHOICES)

    def __str__(self):
        return self.property_name
