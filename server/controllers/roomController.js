
import { response } from 'express';
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
    const { token } = req.body;

    await connection.execute('insert into rooms (room_code,token) values(?,?) ', [roomCode, token])

    res.status(201).json({ roomCode });
  } catch (error) {
    console.error('Error al crear la sala:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}

export async function joinRoom(req, res) {
  try {
    const { userId, roomCode } = req.body

    await connection.execute('call AssignUserToRoom(?,?)', [userId, roomCode])

    return { statusCode: 200, message: "Usuario ingresado a la sala correctamente" };
  } catch (err) {
    return { statusCode: 500, message: "Error al ingresar al usuario" };
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

export async function putSongOnRoom(req, res) {
  const { nombre, duracion, uri, imagen, artista, roomCode } = req.body;

  try {
      const [rows] = await connection.execute('CALL agregarCancion(?, ?, ?, ?, ?, ?)', [
          roomCode, nombre, uri, artista, imagen, duracion
      ]);

      res.status(201).json({ message: 'Canción agregada correctamente' });
  } catch (error) {
      console.error('Error al agregar la canción:', error);
      res.status(500).json({ message: 'Error al agregar la canción' });
  }

}

