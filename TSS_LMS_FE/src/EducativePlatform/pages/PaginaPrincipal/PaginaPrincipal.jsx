import { Link } from 'react-router-dom';

import plataformaEducativa from '../PaginaPrincipal/fotos/Contenido.jpeg';
import styles from './PaginaPrincipal.module.css';

export const PaginaPrincipal = () => {
  return (
    <div className={`container-fluid ${styles.contenedor}`}>
      <div className="row align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-8 text-center">
          <h1 className={`${styles.InicioTitulo} mt-5 mb-4`}>SimuLearn: Plataforma Educativa de Simulación de Sistemas</h1>
          <p className={`${styles.Descripcion} mb-4`}>
            SimuLearn  esta diseñada para facilitar el aprendizaje y la enseñanza de la materia de simulación de sistemas. Su objetivo principal es proporcionar un entorno interactivo y accesible  donde los estudiantes puedan acceder a materiales educativos.
          </p>
          <img src={plataformaEducativa} alt="Plataforma Educativa" className={`img-fluid rounded ${styles.ImagenPrincipal}`} />
          <div className={`${styles.Enlaces} mt-4`}>
            <Link to={`/inicio-sesion`} className={`btn btn-primary ${styles.Enlace} me-2`}>
              Iniciar sesión
            </Link>
            <Link to={`/registro`} className={`btn btn-secondary ${styles.Enlace}`}>
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
