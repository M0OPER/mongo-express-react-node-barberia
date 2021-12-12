const mongoose = require("mongoose");

const administradoresTabla = new mongoose.Schema({
  adm_usuario_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

/*
administradoresTabla.pre("save", async function (next) {
  next();
});
*/

const Administradores = new mongoose.model("administradores", administradoresTabla);

module.exports = Administradores;
