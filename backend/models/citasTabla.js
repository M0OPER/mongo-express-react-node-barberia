const mongoose = require("mongoose");

const citasTabla = new mongoose.Schema({
  cit_externo_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  cit_empleado_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  cit_fecha: {
    type: Date,
    required: true,
  },
  cit_estado: {
    type: String,
    required: true,
  },
});

citasTabla.pre("save", async function (next) {
  next();
});

const Citas = new mongoose.model("citas", citasTabla);

module.exports = Citas;
