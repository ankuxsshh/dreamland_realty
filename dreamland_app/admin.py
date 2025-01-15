from django.contrib import admin
from .models import Property

# Register Property model with custom admin interface
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('property_name', 'property_location', 'property_type', 'property_subtype', 'bhk', 'square_feet', 'property_status', 'possession_date')
    search_fields = ('property_name', 'property_location', 'property_type', 'property_subtype')
    list_filter = ('property_type', 'property_status', 'property_subtype', 'possession_date')
    list_editable = ('property_status',)
    ordering = ('property_name',)
    fieldsets = (
        (None, {
            'fields': ('property_name', 'property_location', 'property_description', 'property_images')
        }),
        ('Property Details', {
            'fields': ('property_type', 'property_subtype', 'bhk', 'square_feet', 'possession_date', 'property_status'),
        }),
    )

# Register the models
admin.site.register(Property, PropertyAdmin)
