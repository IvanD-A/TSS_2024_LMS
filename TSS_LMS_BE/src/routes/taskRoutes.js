import {Router} from 'express'
import dbConnection from '../connection/db.js';
const taskRoutes=Router();

//obtener las tareas de un capitulo
taskRoutes.get("/chapter/:id_capitulo/tasks",async(req,res)=>{
    const {id_capitulo}=req.params;

    const getTasksQuery=`SELECT * FROM tarea WHERE id_capitulo=? `;

   const [rows]=await dbConnection.query(getTasksQuery,[id_capitulo]);

    res.send(rows);
})

// subir una tarea a un capitulo
taskRoutes.post("/chapter/:id_capitulo/tasks",async(req,res)=>{
    const {id_capitulo}=req.params;
    const {descripcion}=req.body;

    const createTaskQuery=`INSERT INTO tarea (id_capitulo,descripcion) 
                            VALUES (?,?)`;

    await dbConnection.query(createTaskQuery,[id_capitulo,descripcion]);
    res.status(201).send("success")
})

// eliminar la tarea de un capitulo
taskRoutes.delete("/chapter/:id_capitulo/tasks/:id_tarea",async(req,res)=>{
    const {id_tarea}=req.params;

    const removeTaskQuery=`DELETE FROM tarea 
                           WHERE id = ?`;

    await dbConnection.query(removeTaskQuery,[id_tarea]);
    res.status(200).send("removed")
})

//editar la tarea de un capitulo
taskRoutes.put("/chapter/:id_capitulo/tasks/:id_tarea",async(req,res)=>{
    const {id_tarea}=req.params;
    const {descripcion}=req.body;
    
    const createTaskQuery=`UPDATE tarea 
                           SET descripcion = ?
                           WHERE id = ?`;
    await dbConnection.query(createTaskQuery,[descripcion,id_tarea]);
    res.status(200).send("updated")
})

//revisar las respuestas a la tarea
taskRoutes.get("/task/:id_tarea/responses",async(req,res)=>{
    const {id_tarea}=req.params;
    const getResponsesQuery=`SELECT tarea.*,
                                    respuesta_tarea.*,
                                    capitulo.*,
                                    usuario.nombre_completo
                            FROM tarea,respuesta_tarea,usuario,capitulo
                            WHERE tarea.id=respuesta_tarea.id_tarea 
                            AND respuesta_tarea.id_usuario=usuario.id
                            AND capitulo.id=tarea.id_capitulo
                            AND tarea.id= ?`;

   const [rows]=await dbConnection.query(getResponsesQuery,[id_tarea]);

    res.send(rows);
})


//responder la tarea de un capitulo
taskRoutes.post("/tasks/responses",async(req,res)=>{
    const {id_usuario,id_tarea,mensaje,codigo}=req.body;

    const createResponseQuery=`INSERT INTO respuesta_tarea (id_usuario,id_tarea,mensaje,codigo) 
                            VALUES (?,?,?,?)`;

    await dbConnection.query(createResponseQuery,[id_usuario,id_tarea,mensaje,codigo]);
    res.status(201).send("created")
})


// eliminar la respuesta a una tarea
taskRoutes.delete("/tasks/responses",async(req,res)=>{
    const {id_usuario,id_tarea}=req.body;

    const deleteResponseQuery=`DELETE FROM respuesta_tarea 
                               WHERE id_usuario = ? 
                               AND id_tarea = ? `;

    await dbConnection.query(deleteResponseQuery,[id_usuario,id_tarea]);
    res.status(200).send("removed")
})


// calificar respuesta
taskRoutes.put("/tasks/responses",async(req,res)=>{
    const {id_usuario,id_tarea,nota}=req.body;

    const updateNoteQuery=`UPDATE respuesta_tarea SET nota = ? 
                               WHERE id_usuario = 2 AND id_tarea = ?`;

    await dbConnection.query(updateNoteQuery,[nota,id_usuario,id_tarea]);

    res.status(201).send("created")
})


//obtener las respuestas de un usuario
taskRoutes.get("/tasks/responses/user/:id_usuario",async(req,res)=>{
    const {id_usuario}=req.params;

    const getResponsesQuery=`SELECT  tarea.*,
                                    respuesta_tarea.*,
                                    capitulo.*,
                                    usuario.nombre_completo
                            FROM tarea,respuesta_tarea,usuario,capitulo
                            WHERE tarea.id=respuesta_tarea.id_tarea 
                            AND respuesta_tarea.id_usuario=usuario.id
                            AND capitulo.id=tarea.id_capitulo
                            AND usuario.id=?`;

   const [rows]=await dbConnection.query(getResponsesQuery,[id_usuario]);

    res.send(rows);
})



export default taskRoutes;