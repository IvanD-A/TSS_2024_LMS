import './SideBar.css';

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const SideBar = () => {
  const [role, setRole] = useState('0');

  useEffect(() => {
      const newRole = localStorage.getItem("id_rol");
    setRole(newRole);
  }, []);
  return (
    <aside className="side-bar d-flex flex-column">
        <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="/clases">
        <img src="./assets/images/birrete.png" alt="" />
       Clases</NavLink>

        <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="contribuir">
        <img src="./assets/images/codigo1.png" alt="" />
          Contribuir</NavLink>

        <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="mensajes">
        <img src="./assets/images/comentario1.png" alt="" />
          Mensajes</NavLink>


      {
          role === '2' ? <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="/clases/mis-entregas">
          <img src="./assets/images/lista-de-verificacion1.png" alt="" />
         mis entregas</NavLink>
          : <></>
      }

    </aside>
  )
}
