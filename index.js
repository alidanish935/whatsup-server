import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import Connection from './database/db.js';
import Router from './routes/Routes.js';
import {Server} from "socket.io";

const app = express();
dotenv.config()

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/',Router)

const PORT = 8000 ||process.env.PORT

Connection()
let users = [];

const server =app.listen(PORT,()=>console.log('server is running on port',PORT) )
const io = new Server(9000, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });
 

const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
    
}

const getUser = (userId) =>{
  console.log('users in getuser func   -',users)
    return users.find(user => user.sub === userId)
}

io.on('connection',  (socket) => {
    console.log('user connected')
    
    socket.on("addUser",userData =>{
      addUser(userData,socket.id)

        console.log('active users-socket-in',users)
        io.emit("getUsers",users)
    })
    console.log('active users',users)
    
    socket.on("sendMessage",data=>{
    console.log('sendMessage data--',data)
        
        const user = getUser(data.receiverId);
        console.log('user in socket - ',user)
        // io.to(user.socketId).emit('getMessage',data)
    })
    
})