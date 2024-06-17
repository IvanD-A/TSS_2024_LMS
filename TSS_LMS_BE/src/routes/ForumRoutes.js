import {Router} from 'express'
import dbConnection from '../connection/db.js';
const forumRoutes= Router();

//obtener todos los mensajes del foro de un capitulo
forumRoutes.get("/chapter/:id/forum",async (req,res)=>{
    try {
        const {id}=req.params;   
        const getMessagesByChapterQuery=`SELECT * FROM mensaje WHERE id_capitulo=?`
        const [rows]= await dbConnection.query(getMessagesByChapterQuery,[id])
        res.status(200).send(rows)
    } catch (error) {
        res.status(500).send(error)
    }
})

// crear un nuevo mensaje para el foro de un capitulo
forumRoutes.post("/chapter/:id/forum", async(req,res)=>{
    try {
        const {id}=req.params;
        const {contenido,autor}=req.body;
        const publishMessageQuery=`INSERT INTO mensaje(id_capitulo,contenido,autor) VALUES (?,?,?)`;
        await dbConnection.query(publishMessageQuery,[id,contenido,autor])
        res.status(201).send("message published")
    } catch (error) {
        res.status(500).send(error)
    }
})

// eliminar el mensaje para el foro de un capitulo
forumRoutes.delete("/chapter/:id_chapter/forum/message/:id", async(req,res)=>{
    try {
        const {id}=req.params;

        const deleteMessageQuery=`DELETE FROM mensaje WHERE mensaje.id = ?`;
        await dbConnection.query(deleteMessageQuery,[id])
        res.status(200).send("message deleted");
    } catch (error) {
        res.status(500).send(error);
    }
})

//editar el mensaje del foro de un capitulo
forumRoutes.put("/chapter/:id_chapter/forum/message/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {contenido}=req.body;
        const updateMessageQuery=`UPDATE mensaje 
                                  SET contenido = ?
                                  WHERE mensaje.id = ?`
        await dbConnection.query(updateMessageQuery,[contenido,id])
        res.status(200).send("message updated");
    } catch (error) {
        res.status(500).send(error);
    }
})



export default forumRoutes;