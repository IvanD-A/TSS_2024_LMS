import {Router} from 'express'
import dbConnection from '../connection/db.js';
const contriRoutes= Router();

//contributions by id
contriRoutes.get('/contributions/:id',async (req,res)=>{
    const {id}=req.params;
    const query=`SELECT contribucion.id as id,
                        usuario.nombre_completo,
                        contribucion.titulo as titulo, 
                        contribucion.descripcion as descripcion, 
                        contribucion.className as className,
                        contribucion.codigo as codigo 
                FROM contribucion,usuario 
                WHERE contribucion.id_usuario=usuario.id and contribucion.id=?`;
    const[rows, fields]= await dbConnection.query(query,[id]);
    res.send(rows);
})

//contributions by user_id
// .../contributions/?user=11
contriRoutes.get('/contributions',async (req,res)=>{
    const {user}=req.query;
    console.log(user)
    let query=``;
    if(typeof(user)==="undefined"){
        query=`SELECT contribucion.id as id,
                        usuario.nombre_completo,
                        contribucion.titulo as titulo, 
                        contribucion.descripcion as descripcion, 
                        contribucion.className as className,
                        contribucion.codigo as codigo 
                    FROM contribucion,usuario 
                    WHERE contribucion.id_usuario=usuario.id`;
    }
    else{
            query=`SELECT contribucion.id as id,
                        usuario.nombre_completo,
                        contribucion.titulo as titulo, 
                        contribucion.descripcion as descripcion, 
                        contribucion.className as className,
                        contribucion.codigo as codigo 
                FROM contribucion,usuario 
                WHERE contribucion.id_usuario=usuario.id and usuario.id=?`;
    }

    const[rows, fields]= await dbConnection.query(query,[user]);
    res.send(rows);
})

//add contributions
contriRoutes.post('/contributions',async (req,res)=>{
    const {id_usuario,titulo,descripcion,className,codigo}=req.body;
    console.log(req.body)
    const query=`INSERT INTO contribucion (id_usuario,titulo,descripcion,className,codigo) 
                        VALUES (?, ?, ?, ?, ?)`;
    const[rows, fields]= await dbConnection.query(query,[id_usuario,titulo,descripcion,className,codigo]);
    res.send(rows);
})

//remove contributions

contriRoutes.delete('/contributions/:id',async (req,res)=>{
    const {id}=req.params;
    const query=`DELETE FROM contribucion WHERE contribucion.id = ?`;
    const[rows, fields]= await dbConnection.query(query,[id]);
    res.send(rows);
})

//update contribution

contriRoutes.put('/contributions/:id',async (req,res)=>{
    const {id}=req.params;
    const {titulo,descripcion,className,codigo}=req.body;
    const query=`UPDATE contribucion 
                SET titulo=?, 
                    descripcion=?, 
                    className=?, 
                    codigo = ?
    WHERE contribucion.id = ?`;
    const[rows, fields]= await dbConnection.query(query,[titulo,descripcion,className,codigo,id]);
    res.send(rows);
})




export default contriRoutes;