import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import webRoutes from './routes/web.js'
import adminRoutes from './routes/adminRouter.js'

import path from 'path'
import ejs from 'ejs'
import WebSocket from 'ws'
import  { NlpManager } from 'node-nlp' 
import { WebSocketServer } from 'ws'
dotenv.config()

const app = express()

const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
app.use(cors())

// Database Connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

// view engine
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false })); 

// Load Routes
app.use("/user", userRoutes);
app.use("/admin",adminRoutes);

app.use("/",webRoutes);

const staticPath = path.join(process.cwd(), 'static');
app.use('/static', express.static(staticPath)); 
// app.use('/static', express.static(path.join(__dirname, 'static')))

const manager = new NlpManager({ languages: ['en'] });
manager.load();
const server = new WebSocketServer({ port: 8080 });
server.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('message', async (message) => {
    console.log(`Received message: ${message}`);
      // Use the NlpManager to process the message
      console.log(`${message}`.length);
      var msg = JSON.stringify(message);
      const response = await manager.process("en",`${message}`);
             if(response.answers.length<=0){
            socket.send("Sorry! we are unable to process this request at current moment.Please contact at Policyfinder2@gmail.com");
               }
             else
               socket.send(response.answer);
                });
  
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})