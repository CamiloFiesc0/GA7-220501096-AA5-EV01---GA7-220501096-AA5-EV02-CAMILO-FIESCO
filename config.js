const mongoose = require('mongoose');

const dbconnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Helpinghands', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 Conexión exitosa a la base de datos Helpinghands');
  } catch (error) {
    console.error('🔴 Error al conectar con MongoDB:', error);
  }
};

module.exports = dbconnect;
