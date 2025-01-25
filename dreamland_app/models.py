from django.db import models
from datetime import date

STATUS_CHOICES = [
    ("available", "Available"),
    ("sold", "Sold"),
]

PROPERTY_TYPE_CHOICES = [
    ("residential", "Residential"),
    ("commercial", "Commercial"),
]

PROPERTY_SUBTYPE_CHOICES = [
    ("villas", "Villas"),
    ("apartments", "Apartments"),
    ("independent_houses", "Independent Houses"),
    ("residential_land", "Residential Land"),
    ("office", "Office"),
    ("industries", "Industries"),
    ("shopping_complexes", "Shopping Complexes"),
    ("farm_houses", "Farm Houses"),
]


class Property(models.Model):
    property_name = models.CharField(max_length=255)
    property_location = models.CharField(max_length=255)
    bhk = models.IntegerField()  # Number of bedrooms
    square_feet = models.IntegerField()  # Size of the property in square feet
    possession_date = models.DateField(default=date.today)  # Default to today's date
    property_status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="available"
    )
    property_description = models.TextField()
    short_description = models.TextField(null=True, blank=True)

    # Main image for the property
    property_main_image = models.ImageField(
        upload_to="properties/images", blank=True, null=True
    )

    # Gallery images (up to 10 images)
    gallery_images = models.ImageField(
        upload_to="properties/images/gallery/", blank=True, null=True
    )

    # Price of the property (nullable)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )  # Allow null

    # Property type (Residential or Commercial)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPE_CHOICES)

    # Property subtype - dynamically changes based on property type
    property_subtype = models.CharField(
        max_length=255, choices=PROPERTY_SUBTYPE_CHOICES
    )

    def __str__(self):
        return self.property_name

    # Helper function to check availability
    def is_available(self):
        return self.property_status == "available"

    # Helper function to display a formatted string
    def display_property_info(self):
        return f"{self.property_name} - {self.property_type} ({self.property_status})"

    # Helper function to calculate price per square foot
    def price_per_sqft(self):
        return (
            self.price / self.square_feet
            if self.price and self.square_feet > 0
            else None
        )

    # Helper function to format price into Indian currency place values
    def formatted_price(self):
        """
        Convert price into Indian place values.
        Example: 8000000 -> '80 Lakhs'
        """
        if not self.price:
            return "Price not available"

        price = int(self.price)  # Convert to integer for easier calculations
        if price >= 10**7:  # Crores
            return f"{price / 10**7:.2f} Crores"
        elif price >= 10**5:  # Lakhs
            return f"{price / 10**5:.2f} Lakhs"
        elif price >= 10**3:  # Thousands
            return f"{price / 10**3:.2f} Thousand"
        else:
            return f"{price} Rupees"
