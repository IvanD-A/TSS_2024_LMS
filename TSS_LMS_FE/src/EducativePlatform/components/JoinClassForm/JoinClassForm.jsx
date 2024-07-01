import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks";
import {get, post } from "../../helpers";
import "./JoinClassForm.css";
export const JoinClassForm = () => {

  const initForm = {id_clase:""};

  const navigate = useNavigate();

  const { form, onFormUpdate } = useForm(initForm);

  const [warning,setWarning]=useState("");
  const joinClass = async (e) => {
    e.preventDefault();
    const localUser = localStorage.getItem("id_usuario");

    const data=await get(`http://tss2024lms-production.up.railway.app/api/class/${form.id_clase}`)
    console.log(data)
    if(data.archivado===0){
      await post("http://tss2024lms-production.up.railway.app/api/class/register", {...form, id_usuario: localUser })
      navigate("/clases")
    }
    else{
    setWarning("la clase se encuetra archivada")
    }
  }


  return (
    <>
    <div className="mt-3" style={{"backgroundColor":"#DC143C","color":"white","borderRadius":": 25px", "textAlign":"center" }} >{warning}</div>
    <h3>Unirse a una clase</h3>
    <form className="register-form border border-dark rounded w-75 p-3 mx-auto">
    <div className="form-group mb-4">
      <label className="mb-1"> <b>Codigo de clase:</b> </label>
      <br/>
      <label >Pidele a tu profesor el código de la clase e introdúcelo aqui:</label>
      <input
        name="id_clase"
        type="text"
        className="form-control"
        placeholder="Codigo de clase"
        onChange={onFormUpdate}
      />
    </div>
    <label>
    Para iniciar sesión con un código de clase <br />
        * Usa una cuenta autorizada <br />
        * Usa un código de clase con 4 o 5 letras o números, sin espacios ni símbolos
    </label>
    <button type="submit" className="btn btn-dark mx-auto d-block" onClick={joinClass} >
      unirse
    </button>
  </form>
    </>
  )
}