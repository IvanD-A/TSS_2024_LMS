import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, post } from "../../helpers";
import styles from "./Mensajes.module.css";

export const Mensajes = () => {
  const [aportes, setAportes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { id_destino } = useParams();
  const id_usuario = localStorage.getItem("id_usuario");

  const getMensajesEnviados = async () => {
    const data = await get(
      `http://localhost:3001/api/myMessages?id_emisor=${id_usuario}&id_receptor=${id_destino}`
    );
    const data2 = await get(
      `http://localhost:3001/api/myMessages?id_emisor=${id_destino}&id_receptor=${id_usuario}`
    );

    const ar = data2.concat(data);
    let sorted = ar.sort((p1, p2) => (p1.id < p2.id ? -1 : p1.id > p2.id ? 1 : 0));
    setAportes(sorted);
  };

  useEffect(() => {
    getMensajesEnviados();
    const intervalId = setInterval(async() => {
      await getMensajesEnviados();
    }, 5000);
    return ()=>{
      clearInterval(intervalId);
    }
  }, []);

  const subirComentario = async (e) => {
    e.preventDefault();

    await post(`http://localhost:3001/api/myMessages`, {
      contenido: mensaje,
      idUsuarioOrigen: id_usuario,
      idUsuarioDestino: id_destino,
    });
    setMensaje("");  // Limpiar el campo de entrada de mensajes
    getMensajesEnviados();  // Actualizar los mensajes
  };

  return (
    <div className={styles.Titulo}>
      {typeof aportes[0] != "undefined" && (
        <h3>{aportes[0].nombre_completo}</h3>
      )}
      {aportes.map((usuario) =>
        id_usuario == usuario.id_emisor ? (

                <p className={`${styles.mensajeEnviado} ${styles.mensaje}`} key={usuario.id}>{usuario.contenido}</p>
                
        ) : (
          
                <p className={`${styles.mensajeRecibido} ${styles.mensaje}`} key={usuario.id}>{usuario.contenido}</p>
         
        )
      )}
      <form onSubmit={subirComentario}>
        <label htmlFor="titulocap" className={styles.textform}>
          {" "}
        </label>
        <input
          type="text"
          id="respuesta"
          name="contenido"
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={styles.box}
        />
        <button
          id="botonNuevoCap"
          type="submit"
          className="btn btn-primary"
        >
          Subir
        </button>
      </form>
    </div>
  );
};