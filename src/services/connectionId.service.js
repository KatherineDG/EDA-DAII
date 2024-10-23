const { ConnectionIdServer, ConnectionIdFront } = require('../models/connectionId.model');

// Crear un nuevo Connection ID en la colección del servidor
const createConnectionIdServer = async (connectionIdData) => {
    try {
        const newConnectionId = new ConnectionIdServer(connectionIdData);
        return await newConnectionId.save();
    } catch (error) {
        console.error('Error al guardar el Connection ID en el servidor:', error);
        throw error;
    }
};

// Obtener el último Connection ID de la colección del servidor
const getLastConnectionIdServer = async () => {
    try {
        const lastConnectionId = await ConnectionIdServer.findOne().sort({ _id: -1 });
        console.log('Último Connection ID:', lastConnectionId);
        return lastConnectionId;
    } catch (error) {
        console.error('Error al obtener el último Connection ID del servidor:', error);
        throw error;
    }
};

// Crear un nuevo Connection ID en la colección del cliente
const createConnectionIdFront = async (connectionIdData) => {
    try {
        const newConnectionId = new ConnectionIdFront(connectionIdData);
        return await newConnectionId.save();
    } catch (error) {
        console.error('Error al guardar el Connection ID en el cliente:', error);
        throw error;
    }
};

// Obtener el último Connection ID de la colección del cliente
const getLastConnectionIdFront = async () => {
    try {
        return await ConnectionIdFront.findOne().sort({ _id: -1 }); // Devuelve el último documento
    } catch (error) {
        console.error('Error al obtener el último Connection ID del cliente:', error);
        throw error;
    }
};

module.exports = {
    createConnectionIdServer,
    getLastConnectionIdServer,
    createConnectionIdFront,
    getLastConnectionIdFront,
};
