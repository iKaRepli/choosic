import express from 'express'
import logger from 'morgan'
import  http  from 'http'
import { Server as SocketServer} from 'socket.io'
import cors from 'cors'


import { createUser, getUserById, getUserByName } from './controllers/userControllers.js';


const port = process.env.PORT ?? 3003

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json());

const server = http.createServer(app)
const io = new SocketServer(server,{
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {
  console.log("Usuario conectado " + socket.id)   

  socket.on('disconnect',() => {
    console.log(`Usuario ${socket.id} desconectado`)
  })


})

app.get('/api/users/:id/:password',getUserById)
app.get('/api/name/:userName',getUserByName)
app.post('/api/register',createUser)

server.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
