import { Router } from 'express';
import fs from 'fs';
import { exec } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const CompilerRoutes = Router();

CompilerRoutes.post('/compiler', async (req, res) => {
    const { className, code, extention } = req.body;
    const executionDirectory = `./assets/${uuidv4()}`;
    const javaFileDir = `${executionDirectory}/${className}.${extention}`;

    try {
        fs.mkdirSync(executionDirectory, { recursive: true });

        fs.writeFile(javaFileDir, code, (err) => {if (err) throw err;}); 
        const absPath = path.resolve(javaFileDir);
        const directory = path.dirname(absPath);
        exec(`javac ${absPath} && java -cp ${directory} ${className}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Compilation or execution error: ${stderr}`);
                return res.status(500).json({ error: stderr });
            }
            res.json({ output: stdout });
        });
    } catch (err) {
        console.error(`Error handling file operations: ${err}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default CompilerRoutes;