const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logsService = require('./services/logs.service');
const logsRoutes = require('./routes/logs.routes'); // Importa la ruta de logs
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const port = 3000;

// Midleware para parsear el body de las peticiones
app.use(express.json());

// Conexion a la base de datos de MongoDB en Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {dbName: 'beluar'})
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.log('Error en la conexión a la base de datos:', error);
  });

app.use('/api', logsRoutes);

// Conexion al websocket
// URL del WebSocket en API Gateway
const websocketUrl = 'wss://25zb4cxwg1.execute-api.us-east-1.amazonaws.com/dev/';

// Crear el cliente WebSocket y conectarse al WebSocket URL
const ws = new WebSocket(websocketUrl);

// Evento que se dispara cuando se establece la conexión con el WebSocket
ws.on('open', function open() {
  console.log('Conexión establecida con el monitoreo en tiempo real');
  ws.send(JSON.stringify({ message: 'Conexión establecida con el monitoreo en tiempo real' }));
});

// Evento que se dispara cuando se recibe un mensaje del WebSocket
ws.on('message', async function incoming(message) {
    console.log('Mensaje recibido (sin procesar):', message);
    const parsedMessage = message.toString('utf8');
    try {
      const jsonMessage = JSON.parse(parsedMessage);
      console.log('Evento recibido:', jsonMessage);


      if (jsonMessage.message === 'Forbidden') {
        console.log('Evento omitido:', jsonMessage);
        return; // Salir de la función para no guardar el log
      }
       // Crear un log con el mensaje recibido
      const logData = {
            topico: jsonMessage.topico,
            event_name: jsonMessage.event_name,
            body: jsonMessage.body,
            connection_id: jsonMessage.connection_id, // Añadir connection_id
            status: jsonMessage.status, // O "error" según la lógica que necesites
            timestamp: new Date().toISOString(), // Añadir timestamp
        };

      // Guardar el log en la base de datos
      await logsService.createLog(logData);
      console.log('Log creado exitosamente:', logData);


    } catch (err) {
      console.log('Mensaje recibido no es un JSON válido:', parsedMessage);
    }
  });
  

// Evento que se dispara cuando la conexión se cierra
ws.on('close', function close() {
  console.log('Cliente desconectado del monitoreo');
});

// Evento que se dispara si ocurre un error en la conexión
ws.on('error', function error(err) {
  console.error('Error en la conexión de WebSocket:', err);
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});