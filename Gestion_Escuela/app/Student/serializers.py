from rest_framework import serializers
from .models import Student
from app.Courses.models import Course
from app.Courses.serializers import CourseSerializer  

class StudentSerializer(serializers.ModelSerializer):
    cursos = CourseSerializer(many=True, read_only=True)  

    class Meta:
        model = Student
        fields = '__all__'  
        ref_name = 'StudentSerializer'  

    def create(self, validated_data):
        cursos = validated_data.pop('cursos', [])  
        student = super().create(validated_data)  

        for curso_id in cursos:
            student.cursos.add(curso_id)  

        return student

    def update(self, instance, validated_data):
        cursos = validated_data.pop('cursos', None)  
        instance = super().update(instance, validated_data)

        if cursos is not None:
            instance.cursos.set(cursos)  

        return instance