from rest_framework import generics
from . import models
from .serializers import CourseSerializer, StudentSerializer
from .models import Student
from rest_framework.exceptions import NotFound  

class StudentCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer  

    def get_queryset(self):
        student_id = self.kwargs.get('pk')  
        if not models.Student.objects.filter(id=student_id).exists():  
            raise NotFound("El estudiante no existe.")  
        return models.Course.objects.filter(estudiantes__id=student_id)  

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer