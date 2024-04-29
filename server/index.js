import express from 'express'
import logger from 'morgan'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'

import { createRoom, joinRoom, getRoomByName } from './controllers/roomController.js'
import { createUser, getUserById, getUserByName } from './controllers/userControllers.js';


const port = process.env.PORT ?? 3003

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json());

const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {
  console.log("Usuario conectado " + socket.id)

  socket.on('create-room', async ({ roomCode }) => {
    try {
      await createRoom(roomCode)

    } catch (err) {
      console.log("Error al crear la sala", err)
    }
  })

  socket.on('join-room', async ({ userId, roomId }) => {
    try {
      await joinRoom({ userId: userId, roomId: roomId })
      socket.join(roomId)
      io.to(roomId).emit('user-joined', userId)
    } catch (err) {
      console.log(err)
    }

  })

  socket.on('disconnect', () => {
    console.log(`Usuario ${socket.id} desconectado`)
  })


})

app.get('/api/users/:id/:password', getUserById)
app.get('/api/name/:userName', getUserByName)
app.get('/api/room/:roomCode', getRoomByName)
app.post('/api/register', createUser)

server.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
