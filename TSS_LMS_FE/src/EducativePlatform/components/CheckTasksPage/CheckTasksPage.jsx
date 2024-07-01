import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { get, post, put } from "../../helpers";
import { TaskComponent } from "./TaskComponent";
export const CheckTasksPage = () => {
    const idRol=localStorage.getItem("id_rol");
    const idUsuario=localStorage.getItem("id_usuario");
    const {id_tarea}=useParams();
    const [tasks,setTasks]=useState([]);

    const getTasks=async()=>{
        const tasksUploaded=await get(`http://tss2024lms-production.up.railway.app/api/task/${id_tarea}/responses`);
        setTasks(tasksUploaded)
    }

    useEffect(()=>{getTasks()},[])

  return (
    <div className="mt-4">
        {tasks.map((task)=><TaskComponent task = {task} index={task.id}></TaskComponent>)}
    </div>
  )
}
