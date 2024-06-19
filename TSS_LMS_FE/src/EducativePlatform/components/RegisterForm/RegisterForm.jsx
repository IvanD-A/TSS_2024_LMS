import { Link } from 'react-router-dom';

import { useForm } from '../../../hooks';
import { post } from '../../helpers';

export const RegisterForm = () => {

  const {form,onFormUpdate,setForm}=useForm({nombre_completo:"",id_rol:2,email:"",password:""})


  const registerUser=async()=>{
    await post("http://localhost:3001/api/register",form);
  }

  const labelStyle = { fontWeight: 'bold',
                       color : '#000009'
  };
  const inputStyle = {
    backgroundColor: '#D9D9D9'
  };
  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white'
  };
  const selectWrapperStyle = {
    position: 'relative'
  };
  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    paddingRight: '30px'
  };
  const iconStyle = {
    position: 'absolute',
    right: '10px',
    transform: 'translateY(-150%)',
    pointerEvents: 'none'
  };

  return (
    <form className="mx-auto border border-dark rounded h-75 w-50 p-3">
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" style={labelStyle} >Nombre Completo</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Nombre Completo"
          name='nombre_completo'
          onChange={onFormUpdate}
          style={{ backgroundColor: '#D9D9D9' }}
        />
      </div>
      <div className="form-group" style={selectWrapperStyle}>
        <label htmlFor="exampleFormControlSelect1" style={labelStyle}>Tipo de cuenta</label>
        <select className="form-control" id="exampleFormControlSelect1" name='id_rol' onChange={onFormUpdate} style={selectStyle}>
          <option value={2}>Estudiante</option>
          <option value={3}>Docente</option>
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" style={iconStyle} viewBox="0 0 16 16">
          <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
        </svg>
      </div>  
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" style={labelStyle} >Email</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          name='email'
          onChange={onFormUpdate}
          style={{ backgroundColor: '#D9D9D9' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlPassword" style={labelStyle} >Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlPassword"
          placeholder="Contraseña"  
          name='password'
          onChange={onFormUpdate}
          style={{ backgroundColor: '#D9D9D9' }}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-dark mb-3" style={{ backgroundColor: '#007BFF', color: 'white' }} onClick={(e)=>{e.preventDefault(); registerUser();}}>
        Registrarse
      </button>
      <br />
      <span style={labelStyle}>
        ¿Ya tienes una cuenta? <Link to="/inicio-sesion">Iniciar sesion</Link>.
      </span>
    </form>
  );
};
