const mongoose = require('mongoose');
const readline = require('readline');
const ModelUser = require('./models'); // tu modelo de usuario

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/Helpinghands', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🟢 Conectado a MongoDB');
  iniciarLogin(); // Llamamos la función solo si se conecta bien
}).catch(err => {
  console.error('❌ Error al conectar con MongoDB:', err);
});

// Configurar consola interactiva
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para pedir usuario y contraseña
function iniciarLogin() {
  rl.question('👤 Usuario: ', (usuario) => {
    rl.question('🔒 Contraseña: ', async (contraseña) => {
      try {
        const user = await ModelUser.findOne({ usuario, contraseña });
        if (user) {
          console.log('✅ Acceso correcto. Bienvenido/a.');
        } else {
          console.log('❌ Usuario o contraseña incorrectos.');
        }
      } catch (err) {
        console.error('❌ Error al buscar el usuario:', err);
      } finally {
        rl.close();
        mongoose.disconnect();
      }
    });
  });
}
