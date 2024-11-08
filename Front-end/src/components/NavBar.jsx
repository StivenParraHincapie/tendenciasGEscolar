import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fs-4 fw-bold" to="/">Gestión Escolar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/register' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/register">Registro</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/cursos' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/cursos">Cursos</Link>
                        </li>
                      {/*   <li className={`nav-item ${location.pathname === '/agregar-estudiante' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/agregar-estudiante">Agregar Estudiante</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/agregar-profesor' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/agregar-profesor">Agregar Profesor</Link>
                        </li> */}
                        <li className={`nav-item ${location.pathname === '/calificaciones' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/calificaciones">Calificaciones</Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link text-danger" to="/" onClick={logout}>Logout</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
