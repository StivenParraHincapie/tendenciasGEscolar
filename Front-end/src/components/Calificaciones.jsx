import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Calificaciones = () => {
    const [calificaciones, setCalificaciones] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [cursosMatriculados, setCursosMatriculados] = useState([]);
    const [estudiante, setEstudiante] = useState('');
    const [curso, setCurso] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [fechaEvaluacion, setFechaEvaluacion] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCalificaciones();
        fetchEstudiantes();
    }, []);

    const fetchCalificaciones = async () => {
        const response = await fetch('http://127.0.0.1:8000/grades/');
        const data = await response.json();
        
        const calificacionesConEstudiantesYCursos = await Promise.all(
            data.map(async (calificacion) => {
                const estudianteResponse = await fetch(`http://127.0.0.1:8000/students/${calificacion.estudiante}/`);
                const estudianteData = await estudianteResponse.json();
                
                const cursoResponse = await fetch(`http://127.0.0.1:8000/courses/${calificacion.curso}/`);
                const cursoData = await cursoResponse.json();

                return {
                    ...calificacion,
                    estudiante: estudianteData,
                    curso: cursoData
                };
            })
        );
        
        setCalificaciones(calificacionesConEstudiantesYCursos);
    };

    const fetchEstudiantes = async () => {
        const response = await fetch('http://127.0.0.1:8000/students/');
        const data = await response.json();
        setEstudiantes(data);
    };

    const fetchCursosMatriculados = async (estudianteId) => {
        const response = await fetch(`http://127.0.0.1:8000/students/${estudianteId}/courses/`);
        if (!response.ok) {
            console.error('Error al obtener cursos matriculados');
            return;
        }
        const data = await response.json();
        setCursosMatriculados(data);
    };

    const handleEstudianteChange = (e) => {
        const selectedEstudiante = e.target.value;
        setEstudiante(selectedEstudiante);
        if (selectedEstudiante) {
            fetchCursosMatriculados(selectedEstudiante);
        } else {
            setCursosMatriculados([]);
        }
        setCurso('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoRegistro = {
            estudiante,
            curso,
            calificacion,
            fecha_evaluacion: fechaEvaluacion,
        };

        try {
            const method = editId ? 'PUT' : 'POST';
            const url = editId
                ? `http://127.0.0.1:8000/grades/${editId}/`
                : 'http://127.0.0.1:8000/grades/';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoRegistro),
            });

            if (response.ok) {
                fetchCalificaciones();
                resetForm();
            } else {
                console.error('Error al guardar la calificación');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (calificacion) => {
        setEstudiante(calificacion.estudiante.id);
        setCurso(calificacion.curso.id);
        setCalificacion(calificacion.calificacion);
        setFechaEvaluacion(calificacion.fecha_evaluacion);
        setEditId(calificacion.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/grades/${id}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCalificaciones();
            } else {
                console.error('Error al eliminar la calificación');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetForm = () => {
        setEstudiante('');
        setCurso('');
        setCalificacion('');
        setFechaEvaluacion('');
        setEditId(null);
        setCursosMatriculados([]);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de Calificaciones', 14, 16);
        
        // Agregar espacio adicional antes de la tabla
        doc.text('', 14, 24); // Espacio en blanco, puedes ajustar el valor 24 según necesites

        doc.autoTable({
            head: [['ID', 'Estudiante', 'Curso', 'Calificación', 'Fecha de Evaluación']],
            body: calificaciones.map((calificacion) => [
                calificacion.id,
                calificacion.estudiante?.nombre_completo || 'Desconocido',
                calificacion.curso?.nombre_del_curso || 'Desconocido',
                calificacion.calificacion,
                calificacion.fecha_evaluacion,
            ]),
        });
        doc.save('calificaciones.pdf');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Gestión de Calificaciones</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Estudiante</label>
                    <select
                        className="form-select"
                        value={estudiante}
                        onChange={handleEstudianteChange}
                        required
                    >
                        <option value="">Selecciona un estudiante</option>
                        {estudiantes.map((est) => (
                            <option key={est.id} value={est.id}>{est.nombre_completo}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Curso</label>
                    <select
                        className="form-select"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        required
                        disabled={!estudiante}
                    >
                        <option value="">Selecciona un curso</option>
                        {cursosMatriculados.map((cur) => (
                            <option key={cur.id} value={cur.id}>{cur.nombre_del_curso}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Calificación</label>
                    <input
                        type="number"
                        className="form-control"
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de Evaluación</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaEvaluacion}
                        onChange={(e) => setFechaEvaluacion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{editId ? 'Actualizar' : 'Agregar'} Calificación</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancelar</button>
            </form>

            <h3 className="mt-4 text-center">Lista de Calificaciones</h3>
            <button onClick={exportPDF} className="btn btn-success mb-3">Exportar a PDF</button>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Estudiante</th>
                        <th>Curso</th>
                        <th>Calificación</th>
                        <th>Fecha de Evaluación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {calificaciones.map((calificacion) => (
                        <tr key={calificacion.id}>
                            <td>{calificacion.id}</td>
                            <td>{calificacion.estudiante?.nombre_completo || 'Desconocido'}</td>
                            <td>{calificacion.curso?.nombre_del_curso || 'Desconocido'}</td>
                            <td>{calificacion.calificacion}</td>
                            <td>{calificacion.fecha_evaluacion}</td>
                            <td>
                                <button onClick={() => handleEdit(calificacion)} className="btn btn-warning btn-sm">Editar</button>
                                <button onClick={() => handleDelete(calificacion.id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calificaciones;
