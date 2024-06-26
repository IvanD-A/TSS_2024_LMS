import {Router} from 'express';
import fs from 'fs';
import {exec} from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const CompilerRoutes= Router();
//toDo refactorizar
CompilerRoutes.post('/compiler',async(req,res)=>{
    const {className,code,extention}=req.body;

    const excecutionDirectory=`./assets/${uuidv4()}`;
    const javaFileDir=`${excecutionDirectory}/${className}.${extention}`;
    console.log(excecutionDirectory);

    fs.mkdirSync(excecutionDirectory,{recursive:true});

    fs.writeFile(javaFileDir, code, (err) => {if (err) throw err;}); 
    const absPath = path.resolve(javaFileDir);
    const directory = path.dirname(absPath);
    exec(`javac ${absPath} && java -cp ${directory} ${className}`, (err, stdout) => {if (err) {
        console.log(err.message)
        return;
    }
    res.send(stdout)
    });

});


export default CompilerRoutes;