from django.contrib import admin
from django.forms import ModelForm, ValidationError
from .models import Property, Configuration


# Custom Admin Form for Property to handle dynamic property_subtype validation
class PropertyAdminForm(ModelForm):
    class Meta:
        model = Property
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        property_type = cleaned_data.get('property_type')
        property_subtype = cleaned_data.get('property_subtype')

        # Validate property_subtype based on property_type
        if property_type and property_subtype:
            valid_subtypes = dict(Property.PROPERTY_SUBTYPE_CHOICES).get(property_type, [])
            valid_subtypes_keys = [subtype[0] for subtype in valid_subtypes]

            if property_subtype not in valid_subtypes_keys:
                valid_subtypes_labels = [subtype[1] for subtype in valid_subtypes]
                raise ValidationError({
                    'property_subtype': f"Invalid subtype for {property_type}. Choose from: {', '.join(valid_subtypes_labels)}."
                })


# Inline configuration model
class ConfigurationInline(admin.TabularInline):
    model = Configuration
    extra = 1


# Custom Admin class for Property
class PropertyAdmin(admin.ModelAdmin):
    form = PropertyAdminForm
    list_display = ('property_name', 'property_location', 'bedrooms', 'square_feet', 'possession_date', 'property_status', 'property_type', 'property_subtype')
    list_filter = ('property_status', 'property_type', 'property_subtype')
    search_fields = ('property_name', 'property_location', 'property_type', 'property_subtype')
    inlines = [ConfigurationInline]

    def save_model(self, request, obj, form, change):
        # Restrict images to less than 20 for a property
        if 'images' in form.changed_data and obj.images:
            property_images_count = Property.objects.filter(images=obj.images).count()
            if property_images_count >= 20:
                raise ValidationError("You can upload a maximum of 20 images for a property.")
        super().save_model(request, obj, form, change)


# Register models with admin site
admin.site.register(Property, PropertyAdmin)
