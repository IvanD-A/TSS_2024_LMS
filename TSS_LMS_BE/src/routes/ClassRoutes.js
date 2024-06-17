import {Router} from 'express'
import dbConnection from '../connection/db.js';
import {registerUserInClass } from '../helpers/registerClass.js';

const classRoutes= Router();

classRoutes.get('/class/:id',async (req,res)=>{
    const idClase=req.params.id;
    const query=`SELECT clase.id as id_clase,
                    clase.nombre_clase as nombre_clase,
                    capitulo.titulo_capitulo as titulo_capitulo,
                    capitulo.id as id_capitulo, 
                    capitulo.titulo_material as titulo_material,
                    capitulo.descripcion_material as descripcion_material,
                    capitulo.estado_foro as estado_foro,
                    capitulo.titulo_foro as titulo_foro,
                    capitulo.descripcion_foro as descripcion_foro
                FROM clase,capitulo 
                WHERE clase.id=? and clase.id=capitulo.id_clase`;

    const[rows]= await dbConnection.query(query,[idClase]);
    if(rows.length===0){
        res.send([]);
    }
    else{
        const chaptersList=rows.map((row)=>{
            return{ 
                    id_capitulo:row.id_capitulo,
                    titulo_capitulo: row.titulo_capitulo,
                    titulo_material: row.titulo_material,
                    descripcion_material: row.descripcion_material,
                    estado_foro: row.estado_foro,
                    titulo_foro: row.titulo_foro,
                    descripcion_foro: row.descripcion_foro,
                    enlace_practica: row.enlace_practica
                }
        });
    
    
        const result={
                    id_clase:rows[0].id_clase,
                    nombre_clase:rows[0].nombre_clase,
                    capitulos:chaptersList,
                    archivado:0,
        }
    
        res.send(result);
    }

})


classRoutes.get('/class/:id/users', async(req,res)=>{
    const userId=req.params.id;
    const query=`SELECT usuario.id as id_usuario,
                        usuario.nombre_completo as nombre_completo,
                        usuario.email as email,
                        rol.nombre_rol as rol 
                FROM usuario,usuario_clase,clase,rol 
                where usuario.id=usuario_clase.id_usuario 
                    and rol.id=usuario.id_rol
                    and clase.id=usuario_clase.id_clase
                    and usuario.id_rol=2
                    and clase.id=?`
    const[rows, fields]= await dbConnection.query(query,[userId]);
    res.send(rows);
})

//metodo para crear una nueva clase y agregar al docente dentro
classRoutes.post('/class/create',async (req,res)=>{
    const {nombre_clase,id_usuario}=req.body;
    const newClassId=await registerUserInClass(nombre_clase,id_usuario);
    res.status(200).send(`New class was created successfully with id: ${newClassId}`)
})

//metodo para registrar a un estudiante en una clase
classRoutes.post('/class/register',async (req,res)=>{
    try {
        const {id_clase,id_usuario}=req.body;
        const query="select * from clase WHERE clase.id=?"
        const[rows]= await dbConnection.query(query,[id_clase]);
        if (rows.length===1){
            const registerUserInClassQuery=`INSERT INTO usuario_clase (id_clase,id_usuario) values (?,?) `
            await dbConnection.query(registerUserInClassQuery,[id_clase,id_usuario]);
            res.send("the user was registered successfully")
        }
        else{
            res.status(400).send("there isn´t exist a class with th id: "+id_clase)
        }
    } catch (error) {
        res.status(500).send("something is wrong")
    }


})



export default classRoutes;