const mongoose = require("mongoose");

const externosTabla = new mongoose.Schema({
  ext_usuario_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  ext_servicio_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
});

externosTabla.pre("save", async function (next) {
  next();
});

const Externos = new mongoose.model("externos", externosTabla);

module.exports = Externos;
