const {
    createConnectionIdServer,
    getLastConnectionIdServer,
    createConnectionIdFront,
    getLastConnectionIdFront,
} = require('../services/connectionId.service');

// Manejar la creación de un Connection ID en el servidor
const handleCreateConnectionIdServer = async (req, res) => {
    try {
        const connectionId = req.body;
        const result = await createConnectionIdServer(connectionId);
        return res.status(201).json({ message: 'Connection ID guardado en el servidor.', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Error al guardar el Connection ID en el servidor.' });
    }
};

// Manejar la obtención del último Connection ID del servidor
const handleGetLastConnectionIdServer = async (req, res) => {
    try {
        const result = await getLastConnectionIdServer();
        console.log(result)
        if (!result) {
            return res.status(404).json({ message: 'No se encontraron Connection IDs en el servidor.' });
        }
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el último Connection ID del servidor. fnkjs' });
    }
};

// Manejar la creación de un Connection ID en el cliente
const handleCreateConnectionIdFront = async (req, res) => {
    try {
        const connectionId = req.body;
        const result = await createConnectionIdFront(connectionId);
        return res.status(201).json({ message: 'Connection ID guardado en el cliente.', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Error al guardar el Connection ID en el cliente.' });
    }
};

// Manejar la obtención del último Connection ID del cliente
const handleGetLastConnectionIdFront = async (req, res) => {
    try {
        const result = await getLastConnectionIdFront();
        if (!result) {
            return res.status(404).json({ message: 'No se encontraron Connection IDs en el cliente.' });
        }
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el último Connection ID del cliente.' });
    }
};

module.exports = {
    handleCreateConnectionIdServer,
    handleGetLastConnectionIdServer,
    handleCreateConnectionIdFront,
    handleGetLastConnectionIdFront,
};
