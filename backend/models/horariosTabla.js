const mongoose = require("mongoose");

const horariosTabla = new mongoose.Schema({
  hor_hora: {
    type: String,
    required: true,
  },
});

const Horarios = new mongoose.model("horarios", horariosTabla);

module.exports = Horarios;
