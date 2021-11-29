const jwt = require("jsonwebtoken");

const Usuarios = require('../models/usuariosTabla');

const authenticate = async(req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).send("No token")
    }else{ 
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await Usuarios.findOne({_id : verifyToken._id, "tokens.token" : token});
      if (!rootUser) {
        res.status(401).send("Usuario no encontrado")
      }else{
        res.status(200).send("Usuario autorizado")
      }
    }
    next();
  } catch (error) {
    res.status(401).send("Error")
    console.log(error)
  }
}

module.exports = authenticate