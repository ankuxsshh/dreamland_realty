from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('contact',views.contact, name='contact'),
    path('services', views.services, name='services') ,
    path('career', views.career, name='career'),
    path('properties', views.properties, name='properties'),
    path('about', views.about, name='about'),
    path('legalteam', views.legalteam, name='legalteam'),
    path('globalreach', views.globalreach, name='globalreach'),
    path('agentsnetwork', views.agentsnetwork, name='agentsnetwork'),
    path('propertydetails', views.propertydetails, name='propertydetails'),
    path('locations/<slug:location_slug>/', views.location_view, name='location'),
]
