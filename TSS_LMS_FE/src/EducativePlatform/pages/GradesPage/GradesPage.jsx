import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../helpers";

export const GradesPage = () => {
    const [students,setStudents]=useState([]);
    const {id}=useParams();
    console.log(`http://localhost:3001/api/chapter/${id}/tasks-notes`,id)
    const getStudents=async()=>{
        const data= await get(`http://localhost:3001/api/chapter/${id}/tasks-notes`);
        console.log(data);
        setStudents(data);
    }

    useEffect(()=>{getStudents()},[id])
    

  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre completo</th>
            <th scope="col">Email</th>
            <th scope="col">Capitulo</th>
            <th scope="col">Descripcion de la tarea</th>
            <th scope="col">Nota</th>
          </tr>
        </thead>
        <tbody>
        {
            students.map((student)=>(
                <tr ket={student.id}>
                <td>{student.id}</td>
                <td>{student.nombre_completo}</td>
                <td>{student.email}</td>
                <td>{student.titulo_capitulo}</td>
                <td>{student.descripcion_tarea}</td>
                {student.nota===null? <td> sin calificar</td>: <td>{student.nota}</td>}


              </tr>
            ))

        }

        </tbody>
      </table>



    </>
  );
};
