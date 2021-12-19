const mongoose = require("mongoose");

const serviciosTabla = new mongoose.Schema({
  ser_nombre: {
    type: String,
    required: true,
  },
  ser_costo: {
    type: Number,
    required: false,
  },
  ser_descripcion: {
    type: String,
    required: false,
  },
  ser_estado: {
    type: String,
    required: true,
  },
});

serviciosTabla.pre("save", async function (next) {
  next();
});

const Servicios = new mongoose.model("servicios", serviciosTabla);

module.exports = Servicios;
