from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("contact", views.contact, name="contact"),
    path("services", views.services, name="services"),
    path("career", views.career, name="career"),
    path("add-property", views.add_property, name="add_property"),
    path("properties", views.properties, name="properties"),
    path("properties", views.property_list, name="property_list"),
    path("about", views.about, name="about"),
    path("legalteam", views.legalteam, name="legalteam"),
    path("globalreach", views.globalreach, name="globalreach"),
    path("agentsnetwork", views.agentsnetwork, name="agentsnetwork"),
    path("locations/<slug:location_slug>/", views.location_view, name="location"),
    path(
        "propertydetails/<int:property_id>",
        views.propertydetails,
        name="propertydetails",
    ),
    path("search", views.search_properties, name="search_properties"),
    path("properties/", views.filter_properties, name="filter_properties"),
]
