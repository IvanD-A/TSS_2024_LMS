import express from 'express'
import ChapterRoutes from './routes/ChapterRoutes.js';
import classRoutes from './routes/ClassRoutes.js';
import CompilerRoutes from './routes/CompilerRoutes.js';
import registerRoutes from './routes/RegisterClassRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import cors from 'cors'
import practiceRoutes from './routes/PracticeRoutes.js';
import authRoutes from './routes/auth.js';
import contriRoutes from './routes/ContriRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import contributionMessageRoutes from './routes/ContributionMessageRoutes.js';
import messageRoutes from './routes/messagesRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
const app = express()
const APIRoute='/api';

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("port",process.env.PORT || 3001);
app.use(cors())
app.use(APIRoute,userRoutes);
app.use(APIRoute,ChapterRoutes);
app.use(APIRoute,classRoutes);
app.use(APIRoute,registerRoutes);
app.use(APIRoute,CompilerRoutes);
app.use(APIRoute,practiceRoutes);
app.use(APIRoute,authRoutes);
app.use(APIRoute,contributionMessageRoutes)
app.use(APIRoute,contriRoutes);
app.use(APIRoute,forumRoutes);
app.use(APIRoute,messageRoutes);
app.use(APIRoute,taskRoutes);

console.log("Server is running on port: "+app.get("port"));
app.listen(app.get("port"))
