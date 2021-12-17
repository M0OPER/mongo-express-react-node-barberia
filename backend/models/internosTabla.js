const mongoose = require("mongoose");

const internosTabla = new mongoose.Schema({
  int_usuario_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
});

internosTabla.pre("save", async function (next) {
  next();
});

const Internos = new mongoose.model("internos", internosTabla);

module.exports = Internos;
