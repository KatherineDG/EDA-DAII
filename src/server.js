const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', (ws) => { 
  console.log('Cliente conectado al monitoreo');

  ws.send(JSON.stringify({
    message: 'Conexión establecida con el monitoreo en tiempo real'
  }));

  ws.on('message', (message) => {
    console.log('Evento recibido: ', message);
  });

});


ws.on('close', () => {
  console.log('Cliente desconectado del monitoreo')
});

console.log('Servidor WebSocket escuchando')

