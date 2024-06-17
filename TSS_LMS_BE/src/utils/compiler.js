import fs from 'fs'
import {exec} from 'child_process'

export const getCompilerOutput=async(className,content,extention)=>{
    const javaFileDir=`./assets/${className}.${extention}`;

    fs.writeFile(javaFileDir, content, (err) => {if (err) throw err;}); 

     exec(`javac ${javaFileDir} && java -cp ./assets ${className}`, (err, stdout, stderr) => {if (err) {return;}
    return stdout;
    });
    
}


