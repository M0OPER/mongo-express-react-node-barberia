const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuariosTabla = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ]
})

usuariosTabla.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = bcryptjs.hashSync(this.password, 10)
  }
  next();
})

usuariosTabla.methods.generateToken = async function () {
  try {
    let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: generatedToken })
    await this.save();
    return generatedToken;
  } catch (error) {
    console.log(error)
  }
}

const Usuarios = new mongoose.model("usuarios", usuariosTabla)

module.exports = Usuarios;