// index.ts
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // replace with your Angular app URL
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg: string) => {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });
  socket.on("joiningMessage",(msg:string)=>{
    io.emit("joiningMessage",msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});