from django.urls import path
from .views import StudentListCreateView, StudentDetailView, StudentCoursesView

urlpatterns = [
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),
    path('students/<int:pk>/courses/', StudentCoursesView.as_view(), name='student-courses'),
    path('', StudentListCreateView.as_view(), name='student-list-create'),
    path('<int:pk>/', StudentDetailView.as_view(), name='student-detail'),
    path('<int:pk>/courses/', StudentCoursesView.as_view(), name='student-courses'),  
]
