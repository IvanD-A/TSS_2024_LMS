import { Router } from "express";
import dbConnection from "../connection/db.js";

const chapterRoutes = Router();

chapterRoutes.get("/chapters/:id/material", async (req, res) => {
  const [rows, field] = await dbConnection.query(
    `
    SELECT  capitulo.id as id_capitulo,
            capitulo.titulo_capitulo,
            capitulo.titulo_material,
            capitulo.descripcion_material,
            archivo.id as id_archivo,
            archivo.nombre_archivo as nombre_archivo,
            archivo.tipo as tipo,
            archivo.enlace as enlace_material,
            archivo.contenido
    FROM capitulo,archivo
    WHERE capitulo.id=? and capitulo.id=archivo.id_capitulo`,
    [req.params.id]
  );

  const material = rows.map((item) => {
    return {
      id_archivo: item.id_archivo,
      nombre_archivo: item.nombre_archivo,
      tipo: item.tipo,
      enlace_material: item.enlace_material,
      contenido: item.contenido,
    };
  });

  const result = {
    id_capitulo: rows[0].id_capitulo,
    titulo_capitulo: rows[0].titulo_capitulo,
    titulo_material: rows[0].titulo_material,
    descripcion_material: rows[0].descripcion_material,
    material: material,
  };
  res.send(result);
});

chapterRoutes.get("/chapters/:id/forum", async (req, res) => {
  const [rows, fields] = await dbConnection.query(
    `
    SELECT  capitulo.titulo_capitulo as titulo_capitulo,
            capitulo.titulo_material as titulo_material,
            capitulo.estado_foro as estado,
            capitulo.titulo_foro as titulo_foro,
            capitulo.descripcion_foro as descripcion_foro,
            mensaje.id as id_mensaje,
            mensaje.autor as autor,
            mensaje.contenido as mensaje
    FROM capitulo,mensaje 
    WHERE capitulo.id=? and capitulo.id=mensaje.id_capitulo`,
    [req.params.id]
  );

  const messages = rows.map((item) => {
    return {
      id_mensaje: item.id_mensaje,
      autor: item.autor,
      mensaje: item.mensaje,
    };
  });
  const result = {
    titulo_capitulo: rows[0].titulo_capitulo,
    titulo_material: rows[0].titulo_material,
    estado: rows[0].estado,
    titulo_foro: rows[0].titulo_foro,
    descripcion_foro: rows[0].descripcion_foro,
    mensajes: messages,
  };
  res.send(result);
});

chapterRoutes.get("/chapters/:id/practice", async (req, res) => {
  const [rows, fields] = await dbConnection.query(
    `SELECT 	capitulo.id as id_capitulo ,
                                                            capitulo.titulo_capitulo as titulo_capitulo,
                                                            practica.id as id_practica,
                                                            practica.titulo_practica as titulo_practica,
                                                            
                                                            practica.contenido as contenido
                                                    FROM capitulo,practica 
                                                    WHERE capitulo.id=practica.id_capitulo
                                                    AND capitulo.id=?`,
    [req.params.id]
  );
  const practices = rows.map((item) => {
    return {
      id_practica: item.id_practica,
      titulo_practica: item.titulo_practica,
      enlace_practica: item.enlace_practica,
      contenido: item.contenido,
    };
  });

  const result = {
    id_capitulo: rows[0].id_capitulo,
    titulo_capitulo: rows[0].titulo_capitulo,
    practicas: practices,
  };

  res.send(result);
});

chapterRoutes.post("/chapters", async (req, res) => {
  try {
    const {titulo_capitulo,titulo_material,descripcion_material,enlace_material,titulo_foro,descripcion_foro,
      estado_foro,titulo_ejemplo,descripcion_ejemplo,codigo_ejemplo,id_clase} = req.body;

    const createChapterQuery = `INSERT INTO capitulo
                                     (titulo_capitulo, titulo_material, descripcion_material,titulo_foro,descripcion_foro,estado_foro,id_clase) 
                                     VALUES (?,?,?,?,?,?,?)`;

    const insertMaterialQuery = `INSERT INTO archivo(enlace, id_capitulo, contenido, tipo, nombre_archivo) 
                                     VALUES (?,?,?,?,?)`;

    const insertInteractivePractice = `INSERT INTO practica(id_capitulo,contenido,titulo_practica,descripcion_practica) 
                                     VALUES (?,?,?,?)`;

    const [rows] = await dbConnection.query(createChapterQuery, [titulo_capitulo,titulo_material,descripcion_material,titulo_foro,descripcion_foro,estado_foro,id_clase]);
    const { insertId } = rows;
    await dbConnection.query(insertMaterialQuery, [enlace_material,insertId,null,null,titulo_material]);
    await dbConnection.query(insertInteractivePractice, [insertId,codigo_ejemplo,titulo_ejemplo,descripcion_ejemplo]);
    res.send("new chapter was created successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("something is wrong");
  }
});
// localhost:3001/api/class/create

chapterRoutes.post("/chapters", async (req, res) => {
  try {
    const {titulo_capitulo,titulo_material,descripcion_material,enlace_material,titulo_foro,descripcion_foro,
      estado_foro,titulo_ejemplo,descripcion_ejemplo,codigo_ejemplo,id_clase} = req.body;

    const createChapterQuery = `INSERT INTO capitulo
                                     (titulo_capitulo, titulo_material, descripcion_material,titulo_foro,descripcion_foro,estado_foro,id_clase) 
                                     VALUES (?,?,?,?,?,?,?)`;

    const insertMaterialQuery = `INSERT INTO archivo(enlace, id_capitulo, contenido, tipo, nombre_archivo) 
                                     VALUES (?,?,?,?,?)`;

    const insertInteractivePractice = `INSERT INTO practica(id_capitulo,contenido,titulo_practica,descripcion_practica) 
                                     VALUES (?,?,?,?)`;

    const [rows] = await dbConnection.query(createChapterQuery, [titulo_capitulo,titulo_material,descripcion_material,titulo_foro,descripcion_foro,estado_foro,id_clase]);
    const { insertId } = rows;
    await dbConnection.query(insertMaterialQuery, [enlace_material,insertId,null,null,titulo_material]);
    await dbConnection.query(insertInteractivePractice, [insertId,codigo_ejemplo,titulo_ejemplo,descripcion_ejemplo]);
    res.send("new chapter was created successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("something is wrong");
  }
});



chapterRoutes.delete("/chapters/:id", async (req,res)=>{
  const {id}=req.params;
  const removeInteractivePracticeQuery = `DELETE FROM practica WHERE practica.id_capitulo = ?`;
  const removeFileQuery=`DELETE FROM archivo WHERE archivo.id_capitulo = ?`
  const removeChapterQuery=`DELETE FROM capitulo WHERE capitulo.id = ?`;

  try{
  await dbConnection.query(removeInteractivePracticeQuery, [id]);
  await dbConnection.query(removeFileQuery, [id]);
  await dbConnection.query(removeChapterQuery, [id]);
  res.status(201).send(`chapter ${id} was removed successfully`)
  }
  catch(error){
    res.status(500).send(error)
  }
})

chapterRoutes.put("/chapters/:id",async (req,res)=>{
  try {
    const {id}= req.params;
    const {titulo_capitulo,titulo_material,descripcion_material,enlace_material,titulo_foro,descripcion_foro,
      estado_foro,titulo_ejemplo,descripcion_ejemplo,codigo_ejemplo} = req.body;
      const updatePractice=`UPDATE practica 
                                SET contenido = ?, 
                                    titulo_practica = ?,
                                    descripcion_practica = ? 
                                WHERE id_capitulo = ?`;

      const updateFileQuery=`UPDATE archivo 
                            SET enlace = ?, 
                                contenido = ?,
                                nombre_archivo = ? 
                              WHERE id_capitulo = ?`;

      const updateChapter=`UPDATE capitulo 
                          SET titulo_capitulo = ?,
                              titulo_material = ?, 
                              descripcion_material = ?,
                              titulo_foro = ?,
                              descripcion_foro = ?,
                              estado_foro=?
                          WHERE id = ? `;

      await dbConnection.query(updatePractice, [codigo_ejemplo,titulo_ejemplo,descripcion_ejemplo,id]);
      await dbConnection.query(updateFileQuery, [enlace_material,null,titulo_material,id]);
      await dbConnection.query(updateChapter, [titulo_capitulo,titulo_material,descripcion_material,titulo_foro,descripcion_foro,estado_foro,id]);
    res.status(201).send("updated successfully")
  } catch (error) {
    res.status(500).send(error)
  }

})


export default chapterRoutes;
