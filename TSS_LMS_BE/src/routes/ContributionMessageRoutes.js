import {Router} from 'express'
import dbConnection from '../connection/db.js';
const contributionMessageRoutes= Router();

//obtener todos los mensajes de una contribucion

contributionMessageRoutes.get("/contribution/:id/message",async(req,res)=>{
    try {
        const {id}=req.params;
        const updateMessageQuery=`SELECT  mc.id as id,
                                          mc.id_autor as id_autor,
                                          u.nombre_completo as nombre_completo,
                                          mc.id_contribucion as id_contribucion,
                                          mc.contenido as contenido 
                                FROM mensaje_contribucion mc, usuario u
                                WHERE mc.id_autor=u.id and  id_contribucion=? `;

        const [rows] =await dbConnection.query(updateMessageQuery,[id])
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send(error);
    }
})

// crear un nuevo mensaje
contributionMessageRoutes.post("/contribution/:id/message", async(req,res)=>{
    try {
        const {id}=req.params;
        const {id_autor,contenido}=req.body;
        const publishMessageQuery=`INSERT INTO mensaje_contribucion (id_autor,id_contribucion,contenido) VALUES (?,?,?)`;
        await dbConnection.query(publishMessageQuery,[id_autor,id,contenido])
        res.status(201).send("message published")
    } catch (error) {
        res.status(500).send(error)
    }
})

// eliminar el mensaje para el foro de un capitulo
contributionMessageRoutes.delete("/contribution/:id_contribution/message/:id_message", async(req,res)=>{
    try {
        const {id_message}=req.params;
        const deleteMessageQuery=`DELETE FROM mensaje_contribucion WHERE id = ?`;
        await dbConnection.query(deleteMessageQuery,[id_message])
        res.status(200).send("message deleted");
    } catch (error) {
        res.status(500).send(error);
    }
})

//editar el mensaje del foro de un capitulo
contributionMessageRoutes.put("/contribution/:id_contribution/message/:id_message",async(req,res)=>{
    try {
        const {id_message}=req.params;
        const {contenido}=req.body;
        const updateMessageQuery=`UPDATE mensaje_contribucion 
                                  SET contenido = ?
                                  WHERE id = ?`;
        await dbConnection.query(updateMessageQuery,[contenido,id_message])
        res.status(200).send("message updated");
    } catch (error) {
        res.status(500).send(error);
    }
})

export default contributionMessageRoutes;