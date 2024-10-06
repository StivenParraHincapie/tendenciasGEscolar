import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();


  const handleStudentsRedirect = () => {
    navigate('/agregar-estudiante');
  };

  const handleTeachersRedirect = () => {
    navigate('/agregar-profesor');
  };

  return (
    <div className="container mt-4">
      <h2>Registro de Usuarios</h2>
      <p>Seleccione el tipo de usuario que desea registrar:</p>
      <div className="d-flex justify-content-around">
        
        <button 
          className="btn btn-primary" 
          onClick={handleStudentsRedirect}>
          Registrar Estudiante
        </button>

      
        <button 
          className="btn btn-secondary" 
          onClick={handleTeachersRedirect}>
          Registrar Profesor
        </button>
      </div>
    </div>
  );
};

export default Register;
