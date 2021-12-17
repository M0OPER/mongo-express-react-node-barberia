const mongoose = require("mongoose");

const comentariosTabla = new mongoose.Schema({
  com_cita_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  com_texto: {
    type: String,
    required: true,
  },
});

comentariosTabla.pre("save", async function (next) {
  next();
});

const Comentarios = new mongoose.model("comentarios", comentariosTabla);

module.exports = Comentarios;
