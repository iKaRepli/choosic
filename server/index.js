import express from 'express'
import logger from 'morgan'
import  http  from 'http'
import { Server as SocketServer} from 'socket.io'


const port = process.env.PORT ?? 3000

const app = express()

app.use(logger('dev'))

const server = http.createServer(app)
const io = new SocketServer(server,{
  cors: {
    origin: "*"
  }
})

io.on('connection', socket => {
  console.log("Usuario conectado " + socket.id.split(3))   
})

server.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
