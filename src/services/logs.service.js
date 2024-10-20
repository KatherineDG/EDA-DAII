const Log = require('../models/logs.model');

const createLog = async (logData) => {
    try {
      const newLog = new Log(logData);
      return await newLog.save();
    } catch (error) {
      console.error('Error al guardar el log:', error);
      throw error;
    }
};

const getAllLogs = async () => {
    try {
      return await Log.find(); // Devuelve todos los logs
    } catch (error) {
      console.error('Error al obtener los logs:', error);
      throw error; // Lanza el error para manejarlo en el controlador
    }
};

// Obtener logs por tópico
const getLogsToTopic = async (topico) => {
    return await Log.find({ topico });
};


// Obtener logs por `event_name` y `topico`
const getLogsToEventNameToTopic = async (event_name, topico) => {
    return await Log.find({ event_name, topico });
  };
  
// Obtener un log por su ID
const getLog = async (id) => {
    return await Log.findById(id);
  };

// Obtener logs por tópico con estado 'error'
const getLogsToTopicWithError = async (topico) => {
    return await Log.find({ topico, status: 'error' });
  };

  // Obtener logs por tópico con estado 'success'
const getLogsToTopicWithSuccess = async (topico) => {
    return await Log.find({ topico, status: 'success' });
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