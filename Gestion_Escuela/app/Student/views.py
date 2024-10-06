from rest_framework import generics
from rest_framework.response import Response
from .models import Student
from .serializers import CourseSerializer, StudentSerializer
from app.Courses import models
from app.Courses import models

class StudentCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer  

    def get_queryset(self):
        student_id = self.kwargs['pk']
        return models.Course.objects.filter(estudiantes__id=student_id)

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer