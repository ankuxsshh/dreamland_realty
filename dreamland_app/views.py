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

