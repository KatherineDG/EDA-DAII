const mongoose = require('mongoose');

const connectionIdSchema = new mongoose.Schema({
  connection_id: { type: String, required: true },
});

const ConnectionIdServer = mongoose.model('ConnectionIdServer', connectionIdSchema, 'connectionIdServer');
const ConnectionIdFront = mongoose.model('ConnectionIdFront', connectionIdSchema, 'connectionIdFront');

module.exports = {
    ConnectionIdServer,
    ConnectionIdFront,
};
