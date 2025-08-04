const express = require("express");
const dbconnect = require("./config");
const ModelUser = require("./models");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(router);

// ✅ CREATE - Crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = await ModelUser.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario', detalle: error });
  }
});

// ✅ READ - Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await ModelUser.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// ✅ READ - Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await ModelUser.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// ✅ UPDATE - Actualizar usuario por ID
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuarioActualizado = await ModelUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuarioActualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
});

// ✅ DELETE - Eliminar usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarioEliminado = await ModelUser.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

app.listen(3005, () => {
  console.log("Servidor corriendo en puerto 3005");
});

dbconnect();
