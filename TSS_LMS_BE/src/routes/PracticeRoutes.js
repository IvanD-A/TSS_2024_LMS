import {Router} from 'express'
import dbConnection from '../connection/db.js';

const practiceRoutes= Router();


practiceRoutes.get('/practice/:id', async(req,res)=>{
    const practiceId=req.params.id;
    const query=`SELECT *
                FROM practica
                where id=?`
    const[rows, fields]= await dbConnection.query(query,[practiceId]);
    res.send(rows);
})


export default practiceRoutes;