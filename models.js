const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  contraseña: { type: String, required: true }
});

const ModelUser = mongoose.model('usuario', UserSchema); // ¡Debe coincidir con el nombre de la colección!

module.exports = ModelUser;
