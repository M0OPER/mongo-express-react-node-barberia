const mongoose = require("mongoose");

const empleadosTabla = new mongoose.Schema({
  emp_usuario_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  emp_servicio_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

empleadosTabla.pre("save", async function (next) {
  next();
});

const Empleados = new mongoose.model("empleados", empleadosTabla);

module.exports = Empleados;