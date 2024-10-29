import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv'
import { UserManager } from './managers/userManager';

dotenv.config()

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI
  }
});

const port = process.env.PORT || 3000;

// const __dirname = path.resolve();

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

const userManager = new UserManager()

io.on('connection', (socket : Socket) => {
  console.log('a user connected');
  userManager.addUser("random Name",socket)

  socket.on("disconnect", () => {
    userManager.removeUser(socket.id)
  })
});

server.listen(port, () => {
  console.log('server running at http://localhost:'+port);
});