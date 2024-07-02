import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks';
import { post } from '../../helpers';

export const RegisterForm = () => {
  const { form, onFormUpdate, setForm } = useForm({ nombre_completo: "", id_rol: 2, email: "", password: "" });
  const navigate = useNavigate();
  const [validEmail, setValidEmail] = useState(true);

  const registerUser = async () => {
      const email = form.email;
      if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) === null) {
          setValidEmail(false);
          return;
      }

      await post("http://localhost:3001/api/register", form)
      .then((response) => {
        if (response.status === 400) {
            alert('Correo ya se encuentra registrado');
            return;
        }
        alert('Usuario registrado correctamente');
        navigate('/inicio-sesion');
      })
      .catch((error) => {
        alert('Error al registrar el usuario');
      });
  }

  const labelStyle = { fontWeight: 'bold', color: '#000009' };
  const inputStyle = { backgroundColor: '#D9D9D9' };
  const buttonStyle = { backgroundColor: '#007BFF', color: 'white' };
  const selectWrapperStyle = { position: 'relative' };
  const selectStyle = { ...inputStyle, appearance: 'none', paddingRight: '30px' };
  const iconStyle = { position: 'absolute', right: '10px', transform: 'translateY(-150%)', pointerEvents: 'none' };

  return (
    <form className="mx-auto rounded h-75 w-50 p-3">
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1" style={labelStyle}>Nombre Completo</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Nombre Completo"
          name='nombre_completo'
          onChange={onFormUpdate}
          style={inputStyle}
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
        <label htmlFor="exampleFormControlInput1" style={labelStyle}>Email</label>
        <span style={{ color: 'red', marginLeft: '10px' }}>{!validEmail ? 'Correo inválido' : ''}</span>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          name='email'
          onChange={onFormUpdate}
          style={inputStyle}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlPassword" style={labelStyle}>Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlPassword"
          placeholder="Contraseña"
          name='password'
          onChange={onFormUpdate}
          style={inputStyle}
        />
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-dark mb-3"
        style={buttonStyle}
        onClick={async (e) => {
            e.preventDefault();
            await registerUser();
        }}
      >
        Registrarse
      </button>
      <br />
      <span style={labelStyle}>
        ¿Ya tienes una cuenta? <Link to="/inicio-sesion">Iniciar sesión</Link>.
      </span>
    </form>
  );
};
