
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'choosic'
  });

function generateRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let roomCode = '';
    for (let i = 0; i < 5; i++) {
        roomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomCode;
}

export async function createRoom(req, res) {
    try {
        const roomCode = generateRoomCode();
        
        await connection.execute('insert into rooms (room_code) values(?) ', [roomCode])

        res.status(201).json({ roomCode });
    } catch (error) {
        console.error('Error al crear la sala:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export async function joinRoom(req, res){
    try{
        const {userId, roomId} = req.body

        await connection.execute('insert into user_in_room (user_id, room_id) values (?, ?)',[userId,roomId])

        res.status(201).json({message: "Usuario ingresado a la sala correctamente"})
    }catch (err){
        res.status(500).json({message_: "error al ingresar usuario"}, err)
    }
}


export async function getRoomByName(req, res) {
      try {
    
        const RoomCode = req.params.roomCode;
  
        const [rows] = await connection.execute('SELECT room_id FROM rooms WHERE room_code = ? ', [RoomCode]);
   
        if (rows.length === 0) {
          return res.status(404).json({ message: 'sala no encontrada' });
        }
   
        res.json(rows[0]);
      } catch (error) {
        console.error('Error al obtener el la sala:', error);
        res.status(500).json({ message: 'Error del servidor' });
      }
    }
  
