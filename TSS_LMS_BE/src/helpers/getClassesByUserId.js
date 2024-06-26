import dbConnection from "../connection/db.js";

export const getUserData = async (userId) => {
  const query = `SELECT    clase.id as id_clase,clase.nombre_clase as nombre_clase 
                            FROM usuario,usuario_clase,clase 
                            WHERE usuario.id=usuario_clase.id_usuario 
                            AND clase.id=usuario_clase.id_clase
                            AND usuario.id=?`;
  const [rows] = await dbConnection.query(query, [userId]);

  const classes = rows.map((item) => {
    return {
      id_clase: item.id_clase,
      nombre_clase: item.nombre_clase,
      archivado:0,
    };
  });


  return classes;
};
