import { Router} from 'express'
import dbConnection from '../connection/db.js';

const registerRoutes= Router();

registerRoutes.post('/class/register',async (req,res)=>{
    const{id_clase,id_usuario}=req.query;
    const query=`INSERT INTO usuario_clase(id_clase,id_usuario) VALUES (?,?)`;
    const[rows, fields]= await dbConnection.query(query,[id_clase,id_usuario]);
    res.send(rows);
})

export default registerRoutes;

