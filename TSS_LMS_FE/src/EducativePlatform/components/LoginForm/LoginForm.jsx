import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  useForm,
  useLogin,
} from '../../../hooks';
import styles from './LoginForm.css';

export const LoginForm = () => {

  const navigate = useNavigate();
  const {form,onFormUpdate} = useForm({ email: "", password: "" });
  const {fetchData} = useLogin("http://localhost:3001/api/login",form);

  const login = () => {
     fetchData()

     setTimeout(function() {
      navigate("/clases")

  }, 1000);
  };

  return (
<div>
<div class="form_container">
    <form className={styles.form_container}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="ingresa tu correo electronico"
          style={{backgroundColor:"#D9D9D9"}}
          onChange={onFormUpdate}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Contraseña</label>
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          id="exampleInputPassword1"
          placeholder="ingresa tu contraseña"
          style={{backgroundColor:"#D9D9D9"}}
          onChange={onFormUpdate}
        />
      </div>
      <button
        className="btn btn-dark mb-3" style={{backgroundColor:"#005187"}} 
        onClick={(e) => {
          e.preventDefault();
          
          login();
        }}
      >
        Ingresar
      </button>
      <br />
      <span>
        ¿No tienes una cuenta? <Link to="/registro">Crear cuenta</Link>.
      </span>
    </form></div></div>
  );
};

