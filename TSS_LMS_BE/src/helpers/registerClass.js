import dbConnection from '../connection/db.js';

export const registerNewClass= async(className)=>{
    const registerClassQuery=`INSERT INTO clase (nombre_clase) VALUES (?)`;
    const [rows]=await dbConnection.query(registerClassQuery,[className]);
    const {insertId}=rows;
    return insertId;
}

export const registerUserInClass=async(className,userId)=>{
    const  newClassId= await registerNewClass(className);
    const registerUserInClassQuery=`INSERT INTO usuario_clase(id_usuario,id_clase) VALUES(?,?)`;
    await dbConnection.query(registerUserInClassQuery,[userId,newClassId]);

    return newClassId; 
}


