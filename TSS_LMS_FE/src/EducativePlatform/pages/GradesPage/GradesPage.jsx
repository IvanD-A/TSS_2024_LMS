import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../helpers";

export const GradesPage = () => {
    const [students, setStudents] = useState([]);
    const [averages, setAverages] = useState([]);
    const { id } = useParams();

    const getStudents = async () => {
        const data = await get(`https://tss2024lms-production.up.railway.app/api/chapter/${id}/tasks-notes`);
        setStudents(data);
        calculateAverages(data);
    };

    const calculateAverages = (data) => {
        const userGrades = {};
        const differentTasks = [];
        data.forEach((task) => {
            if (!differentTasks.includes(task.tarea_id)) {
                differentTasks.push(task.tarea_id);
            }
        });

        data.forEach(student => {
            const { id, nota } = student;

            if (!userGrades[id]) {
                userGrades[id] = { sum: 0, count: 0, nombre_completo: student.nombre_completo, email: student.email };
            }

            userGrades[id].sum += nota;
        });

        const averages = Object.keys(userGrades).map(userId => ({
            id: userId,
            nombre_completo: userGrades[userId].nombre_completo,
            email: userGrades[userId].email,
            promedio: userGrades[userId].sum / differentTasks.length,
        }));

        setAverages(averages);
    };

    useEffect(() => {
        getStudents();
    }, [id]);

    return (
        <>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre completo</th>
                        <th scope="col">Email</th>
                        <th scope="col">Capítulo</th>
                        <th scope="col">Descripción de la tarea</th>
                        <th scope="col">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.nombre_completo}</td>
                            <td>{student.email}</td>
                            <td>{student.titulo_capitulo}</td>
                            <td>{student.descripcion_tarea}</td>
                            <td>{student.nota === null ? "sin calificar" : student.nota}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Promedio de Notas por Estudiante</h2>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre completo</th>
                        <th scope="col">Email</th>
                        <th scope="col">Promedio de Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((average) => (
                        <tr key={average.id}>
                            <td>{average.id}</td>
                            <td>{average.nombre_completo}</td>
                            <td>{average.email}</td>
                            <td>{average.promedio.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
