from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, get_list_or_404
from .models import Property
from datetime import datetime
from django.http import Http404
from django.http import JsonResponse
from django.urls import reverse
from django.db.models import Q


def index(request):
    # Fetch all properties from the database (or limit the number if needed)
    properties = Property.objects.all()
    return render(request, "index.html", {"properties": properties})


def contact(request):
    return render(request, "contact.html")


def services(request):
    return render(request, "services.html")


def career(request):
    return render(request, "career.html")


def properties(request):
    # Fetch all properties from the database (or limit the number if needed)
    properties = Property.objects.all()
    return render(request, "properties.html", {"properties": properties})


def about(request):
    return render(request, "about.html")


def legalteam(request):
    return render(request, "legalteam.html")


def globalreach(request):
    return render(request, "globalreach.html")


def agentsnetwork(request):
    return render(request, "agentsnetwork.html")


# Location dictionary
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


def search_properties(request):
    # Get the search query from the GET parameters
    location_query = request.GET.get("location", "").strip()
    properties = []

    if location_query:
        # Filter properties by location name (case-insensitive)
        properties = Property.objects.filter(
            property_location__icontains=location_query
        )

    context = {
        "location": location_query or "No location specified",
        "properties": properties,
        "locations": LOCATIONS,  # Pass locations for dropdown suggestions
        "message": None if properties else f"No properties found in {location_query}.",
    }

    # Render the results in the locations.html section
    return render(request, "locations.html", context)


def location_view(request, location_slug):
    # Get location name from the LOCATIONS dictionary
    location_name = LOCATIONS.get(location_slug, "Location Not Found")

    # If location not found, show a message
    if location_name == "Location Not Found":
        return render(
            request,
            "locations.html",
            {
                "location": location_name,
                "properties": [],
                "message": "Location Not Found.",
            },
        )

    # Get properties for the location
    properties = Property.objects.filter(property_location__icontains=location_name)

    # If no properties exist for the location, show a message
    if not properties.exists():
        return render(
            request,
            "locations.html",
            {
                "location": location_name,
                "properties": [],
                "message": f"No properties are available in {location_name}.",
            },
        )

    # Render the properties in the locations.html section
    return render(
        request,
        "locations.html",
        {
            "location": location_name,
            "properties": properties,
            "message": None,
        },
    )


def add_property(request):
    if request.method == "POST":
        try:
            # Fetch data from the POST request
            property_name = request.POST.get("property_name")
            property_location = request.POST.get("property_location")
            bhk = int(request.POST.get("bhk", 0))
            square_feet = int(request.POST.get("square_feet", 0))
            possession_date = datetime.strptime(
                request.POST.get("possession_date"), "%Y-%m-%d"
            )
            property_status = request.POST.get("property_status", "available")
            property_description = request.POST.get("property_description", "")
            short_description = request.POST.get("short_description", "")
            property_type = request.POST.get("property_type", "residential")
            property_subtype = request.POST.get("property_subtype", "villas")
            property_image = request.FILES.get("property_images")

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
                property_images=property_image,
            )
            property_obj.save()

            return JsonResponse(
                {"status": "success", "message": "Property added successfully!"}
            )
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})

    return render(request, "add_property.html")


def property_list(request):
    properties = Property.objects.all()
    return render(request, "property_list.html", {"properties": properties})


def propertydetails(request, property_id):
    # Fetch the property using the provided property_id
    property = get_object_or_404(Property, pk=property_id)

    # Pass the property data and gallery images to the template
    return render(request, "propertydetails.html", {"property": property})


def filter_properties(request):
    # Get filter parameters from the request
    country = request.GET.get("country", None)
    location = request.GET.get("location", "")
    property_type = request.GET.get("property_type", None)
    property_subtype = request.GET.get("property_subtype", None)
    min_price = request.GET.get("min_price", 0)
    max_price = request.GET.get("max_price", 10000000)
    min_sqft = request.GET.get("min_sqft", 500)
    max_sqft = request.GET.get("max_sqft", 5000)
    bhk = request.GET.get("bhk", None)
    status = request.GET.get("status", None)
    sort_by = request.GET.get("sort_by", None)

    # Build the query filters based on the parameters
    filter_conditions = Q()

    if location:
        filter_conditions &= Q(location__icontains=location)
    if country:
        filter_conditions &= Q(country=country)
    if property_type:
        filter_conditions &= Q(property_type=property_type)
    if property_subtype:
        filter_conditions &= Q(property_subtype=property_subtype)
    if min_price and max_price:
        filter_conditions &= Q(price__gte=min_price, price__lte=max_price)
    if min_sqft and max_sqft:
        filter_conditions &= Q(square_feet__gte=min_sqft, square_feet__lte=max_sqft)
    if bhk:
        filter_conditions &= Q(bhk=bhk)
    if status:
        filter_conditions &= Q(status=status)

    # Query the properties with the given filter conditions
    properties = Property.objects.filter(filter_conditions)

    # Sorting if required
    if sort_by:
        if sort_by == "new-constructions":
            properties = properties.order_by(
                "-created_at"
            )  # assuming created_at is the field to sort by
        elif sort_by == "under-constructions":
            properties = properties.filter(status="under construction").order_by(
                "-created_at"
            )

    # Return the filtered properties as context for rendering the properties.html
    context = {"properties": properties}

    return render(request, "properties.html", context)
