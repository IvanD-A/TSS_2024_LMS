import {Router} from 'express';
import fs from 'fs';
import {exec} from 'child_process';
import { v4 as uuidv4 } from 'uuid';

const CompilerRoutes= Router();
//toDo refactorizar
CompilerRoutes.post('/compiler',async(req,res)=>{
    const {className,code,extention}=req.body;

    const excecutionDirectory=`./assets/${uuidv4()}`;
    const javaFileDir=`${excecutionDirectory}/${className}.${extention}`;
    console.log(excecutionDirectory);

    fs.mkdirSync(excecutionDirectory,{recursive:true});

    fs.writeFile(javaFileDir, code, (err) => {if (err) throw err;}); 

    exec(`javac ${javaFileDir} && java -cp ${excecutionDirectory} ${className}`, (err, stdout) => {if (err) {return;}
    res.send(stdout)
    });

});


export default CompilerRoutes;