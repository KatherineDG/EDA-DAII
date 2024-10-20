const logsService = require('../services/logs.service');

const createLog = async (req, res) => {
    const { topico, event_name, body, connection_id, status } = req.body;

    // Validación simple
    if (!topico || !event_name || !connection_id || !status) {
        return res.status(400).send('Faltan datos necesarios para crear el log.');
    }

    // Validar el campo status
    const validStatuses = ['success', 'error'];
    if (!validStatuses.includes(status)) {
        return res.status(400).send('El status debe ser "success" o "error".');
    }

    try {
        const savedLog = await logsService.createLog({ topico, event_name, body, connection_id, status });
        res.status(201).json(savedLog); // Devuelve el log guardado
    } catch (error) {
        console.error('Error al crear el log:', error);
        res.status(500).send('Error al crear el log.');
    }
};

const getAllLogs = async (req, res) => {
    try {
        const logs = await logsService.getAllLogs();
        res.status(200).json(logs); // Devuelve todos los logs
    } catch (error) {
        console.error('Error al obtener los logs:', error);
        res.status(500).send('Error al obtener los logs.');
    }
};

// Obtener logs por tópico
const getLogsToTopic = async (req, res) => {
    const { topico } = req.params;
  
    try {
      const logs = await logsService.getLogsToTopic(topico);
      if (logs.length === 0) {
        return res.status(404).send(`No se encontraron logs para el tópico: ${topico}`);
      }
      res.status(200).json(logs);
    } catch (error) {
      console.error(`Error al obtener logs para el tópico ${topico}:`, error);
      res.status(500).send(`Error al obtener logs para el tópico ${topico}.`);
    }
};


// Obtener logs por `event_name` y `topico`
const getLogsToEventNameToTopic = async (req, res) => {
    const { event_name, topico } = req.params;
  
    try {
      const logs = await logsService.getLogsToEventNameToTopic(event_name, topico);
      if (logs.length === 0) {
        return res.status(404).send(`No se encontraron logs para el evento: ${event_name} en el tópico: ${topico}`);
      }
      res.status(200).json(logs);
    } catch (error) {
      console.error(`Error al obtener logs para el evento ${event_name} en el tópico ${topico}:`, error);
      res.status(500).send(`Error al obtener logs para el evento ${event_name} en el tópico ${topico}.`);
    }
  };


  // Obtener un log por su ID
const getLog = async (req, res) => {
    const { id } = req.params;
  
    try {
      const log = await logsService.getLog(id);
      if (!log) {
        return res.status(404).send(`No se encontró el log con ID: ${id}`);
      }
      res.status(200).json(log);
    } catch (error) {
      console.error(`Error al obtener el log con ID ${id}:`, error);
      res.status(500).send(`Error al obtener el log con ID ${id}.`);
    }
  };

// Obtener logs por tópico con estado 'error'
const getLogsToTopicWithError = async (req, res) => {
    const { topico } = req.params;
  
    try {
      const logs = await logsService.getLogsToTopicWithError(topico);
      if (logs.length === 0) {
        return res.status(404).send(`No se encontraron logs con errores en el tópico: ${topico}`);
      }
      res.status(200).json(logs);
    } catch (error) {
      console.error(`Error al obtener logs con errores en el tópico ${topico}:`, error);
      res.status(500).send(`Error al obtener logs con errores en el tópico ${topico}.`);
    }
  };

// Obtener logs por tópico con estado 'success'
const getLogsToTopicWithSuccess = async (req, res) => {
    const { topico } = req.params;
  
    try {
      const logs = await logsService.getLogsToTopicWithSuccess(topico);
      if (logs.length === 0) {
        return res.status(404).send(`No se encontraron logs con éxito en el tópico: ${topico}`);
      }
      res.status(200).json(logs);
    } catch (error) {
      console.error(`Error al obtener logs con éxito en el tópico ${topico}:`, error);
      res.status(500).send(`Error al obtener logs con éxito en el tópico ${topico}.`);
    }
  };

module.exports = {
    createLog,
    getAllLogs,
    getLogsToTopic,
    getLogsToEventNameToTopic,
    getLog,
    getLogsToTopicWithError,
    getLogsToTopicWithSuccess,
};
