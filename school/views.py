from django.shortcuts import render

def index(request):
    return render(request, 'index.html')  # Make sure templates/index.html exists

def school_overview(request):
    return render(request, 'public/school_overview.html')  # Make sure templates/public/school_overview.html exists

def school_campus(request):
    return render(request, "public/school_campus.html")