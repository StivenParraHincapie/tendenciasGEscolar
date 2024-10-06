
from rest_framework import serializers
from .models import Grade
from app.Student.models import Student
from app.Courses.models import Course

class GradeSerializer(serializers.ModelSerializer):
    estudiante = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    curso = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Grade
        fields = '__all__'  