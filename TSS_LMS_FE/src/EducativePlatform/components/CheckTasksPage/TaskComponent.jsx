import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import AceEditor from "react-ace";
import { put } from "../../helpers";
export const TaskComponent =({task})=>{
    const idRol=localStorage.getItem("id_rol");
    const idUsuario=localStorage.getItem("id_usuario");
    const [nota,setNota] = useState(0);
    const {id_tarea}=useParams();
    const navigate =useNavigate();
    useEffect(()=>{console.log(task)},[])
    const onPublicNote=async(e,userId,note)=>{
        e.preventDefault();
        await put(`https://tss2024lms-production.up.railway.app/api/tasks/responses`,{id_usuario: userId,id_tarea:id_tarea ,nota:note});
        await navigate(-1);
    }
    return <>
        {task.id}
        <h4>respuesta de la tarea para el capitulo con id:  {task.id_capitulo}</h4>
        <br />    
        <div class="form-group">
            <label for="exampleFormControlTextarea1"> <b>Nombre: </b> {task.nombre_completo}</label>
            <p></p>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1"> <b>Mensaje:</b> {task.mensaje} </label>
            <p></p>
        </div>

        <div class="form-group">
            <label for="exampleFormControlTextarea1"> <b>enlace: </b>{task.enlace} </label>
            <p></p>
        </div>

        <label for="exampleFormControlTextarea1"> <b>Codigo:</b> </label>
        <AceEditor mode={"Java"}
                style={{height:"20vh",border:"1px solid black"}}
                fontSize={14}
                value={task.codigo}
                setOptions={{
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                }}
                editorProps={{ $blockScrolling: false }}
                />
                <br />
    <div >                   
    <label><b>Nota</b></label> <input style={{"width":"60px"}} type="number" name="nota" value={nota}onChange={e=>setNota(e.target.value)} id={`nota-${task.id}`} min={1} />
    </div> <br />
    <button className="btn btn-primary" onClick={(e)=>{onPublicNote(e,task.id_usuario,nota)}}>Devolver</button>


    </>
}
