const mongoose = require("mongoose");

const serviciosInternosTabla = new mongoose.Schema({
  si_interno_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  si_servicio_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

serviciosInternosTabla.pre("save", async function (next) {
  next();
});

const ServiciosInternos = new mongoose.model("serviciosinternos", serviciosInternosTabla);

module.exports = ServiciosInternos;
