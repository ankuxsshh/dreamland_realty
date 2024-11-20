from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,'index.html')

def contact(request):
    return render(request,'contact.html')

def services(request):
    return render(request,'services.html')

def career(request):
    return render(request,'career.html')

def properties(request):
     return render(request,'properties.html')

def propertydetails(request):
    return render(request, 'propertydetails.html')

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
    # Determine the location name from the slug
    location_name = LOCATIONS.get(location_slug, "Location Not Found")
    
    # Pass the location name to the template
    return render(request, 'locations.html', {'location': location_name})
