import {Router} from 'express'
import dbConnection from '../connection/db.js';

const messageRoutes= Router();

//obtener los mensajes que intercambie con un usuario
messageRoutes.get("/myMessages",async(req,res)=>{
    const {id_emisor,id_receptor}=req.query;
    const getMyMessagesQuery=`SELECT  mensaje_usuario.id,
                                        mensaje_usuario.contenido, 
                                        mensaje_usuario.id_emisor,	
                                        mensaje_usuario.id_receptor,		
                                        usuario.nombre_completo,
                                        usuario.email	
                            FROM mensaje_usuario,usuario
                            WHERE id_emisor=?
                            AND id_receptor=? 
                            AND id_receptor=usuario.id`;

    const [rows] =await dbConnection.query(getMyMessagesQuery,[id_emisor,id_receptor])
    res.send(rows)
})

messageRoutes.post("/myMessages",async(req,res)=>{
    const {idUsuarioOrigen,idUsuarioDestino,contenido}=req.body;

    const putMessageQuery=`INSERT INTO mensaje_usuario (id_emisor, id_receptor,contenido) 
                              VALUES (?,?,?)`

   await dbConnection.query(putMessageQuery,[idUsuarioOrigen,idUsuarioDestino,contenido])

   res.status(201).send("created")

})


messageRoutes.delete("/myMessages/:id",async(req,res)=>{
    const {id}=req.params;

    const deleteMessageQuery=`DELETE FROM mensaje_usuario WHERE id = ?`

    await dbConnection.query(deleteMessageQuery,[id])

   res.status(200).send("successfull")
})




export default messageRoutes;