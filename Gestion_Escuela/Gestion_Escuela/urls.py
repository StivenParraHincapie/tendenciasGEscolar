from django.contrib import admin

from django.urls import path, include
from app.Student import views

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="API de Gestión Escolar",
        default_version='v1',
        description="Documentación de la API",
        contact=openapi.Contact(email="juanestd1013@hotmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('students/', include('app.Student.urls')),
    path('teachers/', include('app.Teachers.urls')),
    path('courses/', include('app.Courses.urls')),
    path('grades/', include('app.Grades.urls')),
    
    
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]