const express = require('express');
const router = express.Router();
const {
    handleCreateConnectionIdServer,
    handleGetLastConnectionIdServer,
    handleCreateConnectionIdFront,
    handleGetLastConnectionIdFront,
} = require('../controllers/connectionId.controller');

// Rutas para Connection ID del servidor
router.post('/connection-id/server', handleCreateConnectionIdServer); // Crear Connection ID en el servidor
router.get('/connection-id/server/last', handleGetLastConnectionIdServer); // Obtener último Connection ID del servidor

// Rutas para Connection ID del cliente
router.post('/connection-id/front', handleCreateConnectionIdFront); // Crear Connection ID en el cliente
router.get('/connection-id/front/last', handleGetLastConnectionIdFront); // Obtener último Connection ID del cliente

module.exports = router;
