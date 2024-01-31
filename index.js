import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import Connection from './database/db.js';
import Router from './routes/Routes.js';
import {Server} from "socket.io";

const io = new Server(9000, {
   cors:{
        origin: "http://localhost:3000"
    },
})

const app = express();
dotenv.config()

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/',Router)

const PORT = 8000

Connection()


app.listen(PORT,()=>console.log('server is running on port',PORT) )


// socket 
let users = [];

const addUser = (userData, socketId) => {
    // console.log('addUser function called with userData, socketId:', userData, socketId);
    // console.log('User already exists:', users.some(user => user.sub === userData.sub));
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
    
    // console.log('users after adding user:', users);// getting value of users
}
const getUser = (userId) =>{
    console.log('userId -- ',userId);
    console.log('users-in-getUser-',users)//why not getting value of users

    const user =  users.find(  user   => user.sub === userId)
    console.log('Found user:', user);
    return user;

}
io.on('connection', async (socket) => {
    try {
        console.log('user connected');

        socket.on("addUser", async (userData) => {
            await addUser(userData, socket.id);

            console.log('active users-socket-in', users);
            io.emit("getUsers", users);
        });

        console.log('active users', users);

        socket.on("sendMessage", async (data) => {
            const user = getUser(data.recieverId);
            console.log('user in socket - ', user);
            console.log('usersss in socket - ', users);
            user && io.to(user.socketId).emit('getMessage', data);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});