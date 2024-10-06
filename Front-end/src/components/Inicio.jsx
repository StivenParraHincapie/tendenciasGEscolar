
import React from 'react';

const Inicio = () => {
  return (
    <div style={styles.inicioContainer}>
      <div style={styles.introText}>
        <h1 style={styles.heading}>Bienvenido al Sistema de Gestión Escolar</h1>
        <p style={styles.paragraph}>
          !Este sistema está diseñado para facilitar la administración educativa, brindando herramientas intuitivas para gestionar calificaciones, añadir estudiantes y profesores, y mantener toda la información organizada de manera eficiente. Nuestro objetivo es mejorar la comunicación y la colaboración en el entorno académico.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>Gestión de Calificaciones</h2>
        <p style={styles.paragraph}>
          Con nuestra plataforma, el registro y seguimiento de las calificaciones es sencillo y rápido. Los docentes pueden ingresar y actualizar las notas de sus estudiantes, mientras que los alumnos y sus padres pueden acceder a ellas en tiempo real, promoviendo la transparencia y la mejora continua en el rendimiento académico.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>Añadir Estudiantes y Profesores</h2>
        <p style={styles.paragraph}>
          La administración de estudiantes y profesores es una tarea fundamental en cualquier institución educativa. Este sistema te permite agregar nuevos estudiantes y profesores de forma rápida, asegurando que todos estén registrados y listos para participar activamente en el proceso educativo. Mantén los perfiles actualizados y la información siempre accesible.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>Optimización del Flujo Académico</h2>
        <p style={styles.paragraph}>
          Desde la planificación de cursos hasta la evaluación final, nuestro sistema está diseñado para optimizar cada paso del flujo académico. Facilita la creación de horarios, la asignación de materias a profesores, y la inscripción de estudiantes, garantizando que todas las actividades se desarrollen de manera eficiente y organizada.
        </p>
      </div>
    </div>
  );
};

const styles = {
  inicioContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  introText: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  heading: {
    fontSize: '3em',
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    fontSize: '1.2em',
    color: '#555',
    maxWidth: '800px',
    lineHeight: '1.6',
  },
  section: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
  },
  subheading: {
    fontSize: '2em',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
};

export default Inicio;
