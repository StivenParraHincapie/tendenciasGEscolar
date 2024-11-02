# Generated by Django 5.1.1 on 2024-11-02 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_completo', models.CharField(max_length=255)),
                ('correo_electronico', models.EmailField(max_length=254, unique=True)),
                ('numero_telefono', models.CharField(max_length=20)),
                ('fecha_nacimiento', models.DateField()),
                ('direccion', models.CharField(max_length=255)),
                ('rol', models.CharField(choices=[('Estudiante', 'Estudiante'), ('Profesor', 'Profesor'), ('Administrativo', 'Administrativo')], max_length=50)),
                ('nombre_usuario', models.CharField(max_length=50, unique=True)),
                ('contraseña', models.CharField(max_length=255)),
            ],
        ),
    ]