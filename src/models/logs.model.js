// log.model.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  topico: { type: String, required: true },
  event_name: { type: String, required: true },
  body: { type: mongoose.Schema.Types.Mixed }, // Permite cualquier estructura
  connection_id: { type: String, required: true }, // Agregar connectionId
  status: { type: String, enum: ['success', 'error'], required: true }, // Agregar status
  timestamp: { type: Date, default: Date.now }, // Agregar un timestamp
});

const Log = mongoose.model('Log', logSchema, 'logs');

module.exports = Log;
