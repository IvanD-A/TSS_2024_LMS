import './SideBar.css';

import { NavLink } from 'react-router-dom';

export const SideBar = () => {
  return (
    <aside className="side-bar d-flex flex-column">
        <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="/clases">
        <img src="./assets/images/birrete.png" alt="" />
       Clases</NavLink> 

        <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="contribuir">
        <img src="./assets/images/codigo 1.png" alt="" />
          Contribuir</NavLink>

        <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="mensajes">
        <img src="./assets/images/comentario 1.png" alt="" />
          Mensajes</NavLink>


          <NavLink className="my-4 d-block mx-auto text-light text-decoration-none" to="/clases/mis-entregas">
          <img src="./assets/images/lista-de-verificacion 1.png" alt="" />
         mis entregas</NavLink>   

    </aside>
  )
}
