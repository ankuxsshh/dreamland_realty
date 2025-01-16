from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Property
from datetime import datetime

def index(request):
    # Fetch all properties from the database (or limit the number if needed)
    properties = Property.objects.all()
    return render(request, 'index.html', {'properties': properties})

def contact(request):
    return render(request,'contact.html')

def services(request):
    return render(request,'services.html')

def career(request):
    return render(request,'career.html')

def properties(request):
    # Fetch all properties from the database (or limit the number if needed)
    properties = Property.objects.all()
    return render(request,'properties.html', {'properties': properties})

def about(request):
    return render(request,'about.html')

def legalteam(request):
    return render(request,'legalteam.html')

def globalreach(request):
    return render(request,'globalreach.html')

def agentsnetwork(request):
    return render(request,'agentsnetwork.html')

LOCATIONS = {
    "abu_dhabi": "Abu Dhabi",
    "sharjah": "Sharjah",
    "dubai": "Dubai",
    "umm_al_quwain": "Umm Al Quwain",
    "fujairah": "Fujairah",
    "ajman": "Ajman",
    "ras_al_khaimah": "Ras Al Khaimah",

    "trivandrum": "Trivandrum",
    "alappuzha": "Alappuzha",
    "kottayam": "Kottayam",
    "kochi": "Kochi",
    "thrissur": "Thrissur",
    "kozhikode": "Kozhikode",
    "kannur": "Kannur",

    "mumbai": "Mumbai",
    "pune": "Pune",
    "delhi": "Delhi",
    "noida": "Noida",
    "gurugram": "Gurugram",
    "banglore": "Banglore",
    "hyderabad": "Hyderabad",
    "chennai": "Chennai",
    "kolkata": "Kolkata",
    "ahmedabad": "Ahmedabad",
    "lucknow": "Lucknow",
    "coimbatore": "Coimbatore",
    "goa": "Goa",
    "nagpur": "Nagpur",
    "vancouver": "Vancouver",
}

def location_view(request, location_slug):
    location_name = LOCATIONS.get(location_slug, "Location Not Found")
    return render(request, 'locations.html', {'location': location_name})

def add_property(request):
    if request.method == 'POST':
        try:
            # Fetch data from the POST request
            property_name = request.POST.get('property_name')
            property_location = request.POST.get('property_location')
            bhk = int(request.POST.get('bhk', 0))
            square_feet = int(request.POST.get('square_feet', 0))
            possession_date = datetime.strptime(request.POST.get('possession_date'), '%Y-%m-%d')
            property_status = request.POST.get('property_status', 'available')
            property_description = request.POST.get('property_description', '')
            short_description = request.POST.get('short_description', '')
            property_type = request.POST.get('property_type', 'residential')
            property_subtype = request.POST.get('property_subtype', 'villas')
            property_image = request.FILES.get('property_images')

            # Save the property to the database
            property_obj = Property(
                property_name=property_name,
                property_location=property_location,
                bhk=bhk,
                square_feet=square_feet,
                possession_date=possession_date,
                property_status=property_status,
                property_description=property_description,
                short_description=short_description,
                property_type=property_type,
                property_subtype=property_subtype,
                property_images=property_image
            )
            property_obj.save()

            return JsonResponse({'status': 'success', 'message': 'Property added successfully!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return render(request, 'add_property.html')

def property_list(request):
    properties = Property.objects.all()
    return render(request, 'property_list.html', {'properties': properties})

def propertydetails(request, property_id):
    # Fetch the property using the provided property_id
    property = get_object_or_404(Property, pk=property_id)
    
    # Pass the property data and gallery images to the template
    return render(request, 'propertydetails.html', {'property': property})