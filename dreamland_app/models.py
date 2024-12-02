from django.db import models

class Property(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('sold', 'Sold'),
    ]

    PROPERTY_TYPE_CHOICES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('agriculture', 'Agriculture'),
    ]

    PROPERTY_SUBTYPE_CHOICES = {
        'residential': [
            ('villas', 'Villas'),
            ('apartments', 'Apartments'),
            ('independent_houses', 'Independent Houses'),
        ],
        'commercial': [
            ('office', 'Office'),
            ('industries', 'Industries'),
            ('shopping_complexes', 'Shopping Complexes'),
        ],
        'agriculture': [
            ('land', 'Land'),
            ('farm_houses', 'Farm Houses'),
        ],
    }

    property_name = models.CharField(max_length=255)
    property_location = models.CharField(max_length=255)
    bhk = models.IntegerField()
    square_feet = models.IntegerField()
    possession_date = models.DateField()
    property_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    property_description = models.TextField()
    property_images = models.ImageField(upload_to='properties/images', blank=True, null=True)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPE_CHOICES)
    property_subtype = models.CharField(max_length=255,  choices=PROPERTY_SUBTYPE_CHOICES)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Validate the property_subtype based on the selected property_type
        valid_subtypes = dict(self.PROPERTY_SUBTYPE_CHOICES).get(self.property_type, [])
        if self.property_subtype not in [subtype[0] for subtype in valid_subtypes]:
            raise ValueError(f"Invalid property subtype for {self.property_type}. Choose from: {', '.join([subtype[1] for subtype in valid_subtypes])}.")
        super().save(*args, **kwargs)

class Configuration(models.Model):
    property = models.ForeignKey(Property, related_name='configurations', on_delete=models.CASCADE)
    configuration_type = models.CharField(max_length=50)  # e.g., '3 BHK', '4 BHK'
    built_up_area = models.IntegerField()  # In Sq.ft
    possession_date = models.DateField()
    price = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.property.name} - {self.configuration_type}"
