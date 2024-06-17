import { Router} from 'express'
import dbConnection from '../connection/db.js';
import { getUserData } from '../helpers/getClassesByUserId.js';

const userRoutes= Router();

userRoutes.get('/users', async(req,res)=>{
    const query=`SELECT usuario.id as id,
                        nombre_completo,
                        email,
                        rol.nombre_rol as rol 
                FROM usuario,rol 
                WHERE usuario.id_rol=rol.id
                AND usuario.id_rol!=1
                `;
    const[rows, fields]= await dbConnection.query(query);
    res.send(rows);
})



userRoutes.get('/users/:id', async(req,res)=>{
    const query=`SELECT usuario.id as id,
                    nombre_completo,
                    email,
                    rol.nombre_rol as rol 
                FROM usuario,rol 
                WHERE usuario.id_rol=rol.id and usuario.id=?`;
                
    const userId=req.params.id;

    const[rows, fields]= await dbConnection.query(query,[userId]);
    res.send(rows);
})
//metodo para obetener las clases de un usuario segun su id
userRoutes.get('/users/:id/class', async(req,res)=>{
    try {
        const {id}=req.params;
        const userClasses= await getUserData(id);
        res.send(userClasses);
    } catch (error) {
        console.log(error)
        res.status(500).send("something is wrong")

    }




})




export default userRoutes;