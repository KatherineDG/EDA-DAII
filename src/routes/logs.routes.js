// logs.routes.js
const express = require('express');
const logsController = require('../controllers/logs.controller'); // Importar el controlador
const router = express.Router();

router.post('/log', logsController.createLog); // Usar el controlador para crear un log

router.get('/logs', logsController.getAllLogs); // Usar el controlador para obtener logs

router.get('/logs/topic/:topico', logsController.getLogsToTopic);

router.get('/logs/topic/:topico/event/:event_name', logsController.getLogsToEventNameToTopic);

router.get('/logs/:id', logsController.getLog);

router.get('/logs/:topico/error', logsController.getLogsToTopicWithError);

router.get('/logs/:topico/success', logsController.getLogsToTopicWithSuccess);

module.exports = router;
