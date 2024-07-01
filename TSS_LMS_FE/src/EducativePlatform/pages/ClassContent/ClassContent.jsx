import './ClassContent.css';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { useFetch } from '../../../hooks/useFetch/useFetch';
import { ChapterLayout } from '../../components/ChapterLayout/ChapterLayout';

export const ClassContent = () => {
const user_rol=localStorage.getItem("id_rol");
const {id}=useParams();
const navigate=useNavigate();

const { content,fetchData }=useFetch(`https://tss2024lms-production.up.railway.app/api/class/${id}`,"GET");
const {data,isLoading,hasError}=content;
const onReloadChapters=()=>{
  fetchData()
}
    return (
      <div  data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" className="scrollspy-example mt-3  h-25" tabindex="0">
      {isLoading?<>cargando datos del curso...</>:<>
      {user_rol==="3" && 
      <>
      <div class="cont-auxi">
      <button 
            className="text-light py-2 px-3 d-block " 
            id='boton-negro'
            style={{"backgroundColor":"#1D2939","borderRadius":"20px" }}
            onClick={()=>{navigate("crear-capitulo")}}
            >Nuevo Cápitulo </button> 
            
           
            <button 
            className="btn btn-outline-secondary" 
            style={{"borderRadius":"20px" }}
            onClick={()=>{navigate("ver-estudiantes")}}
            >ver alumnos inscritos </button>
<br />
<br />
            <button 
            className="btn btn-outline-secondary" 
            style={{"borderRadius":"20px" }}
            onClick={()=>{navigate("ver-notas")}}
            >ver registro de notas </button>
           
      </div>
            </> 
            }
        <h3>{data.nombre_clase}</h3>
        {typeof(data.capitulos)==="undefined"? <>
            {user_rol==="3"?  
                    <>
                        <p>No subiste ningun cotenido a esta clase, puedes empesar haciendo click en el boton "Nuevo Capitulo"</p>
                        <div className="hand-image mx-auto"></div>
                    </> 
                   :
                    <>
                        <p>Todavia no se ha publicado contenido</p>
                        <div className="hand-image mx-auto"></div>
                    </>
            }
            </>
            :
            <>
            {data.capitulos.map((capitulo)=><ChapterLayout key={`${capitulo.id_clase}-${capitulo.titulo_capitulo}`}  capitulo={capitulo}  idCapitulo={capitulo.id_capitulo} onReloadChapters={onReloadChapters} />  )}
            
            </> }
      </> }   
  </div>
  )
}
