from django.contrib import admin
from django.urls import path
from school import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='home'),  # Home page
    path('overview/', views.school_overview, name='school_overview'),  # School overview page
    path('campus/', views.school_campus, name='school_campus'),
    
]
