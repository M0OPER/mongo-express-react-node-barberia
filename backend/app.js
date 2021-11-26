const dotenv       = require("dotenv");
const express      = require("express");
const bcryptjs     = require("bcryptjs");
const jwt          = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config({path : './config.env'});
require('./db/conn')
const port = process.env.PORT;

const Usuarios = require('./models/usuariosTabla')

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

app.get('/', (req, res) =>{
  res.send("Helllo world");
});

app.post('/registrarExterno', async (req, res) =>{
  try {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const email = req.body.email;
    const password = req.body.password;

    const createUser = new Usuarios({
      nombres  : nombres,
      apellidos: apellidos,
      email    : email,
      password : password
    })

    const created = await createUser.save();
    console.log(created)
    res.status(200).send("HECHO");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Usuarios.findOne({ email : email });
    if (user) {
      const isWorking = await bcryptjs.compare(password, user.password);
      if (isWorking) {
        const token = await user.generateToken();
        res.cookie('jwt', token, {
          expires  : new Date(Date.now() + 86400000),
          httpOnly : true
        })
        res.status(200).send("LOGEADO");
      }else{
        res.status(400).send("USUARIO O CONTRASEÑA INCORRECTA");
      }
    }else{
      res.status(400).send("USUARIO O CONTRASEÑA INCORRECTA");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, ()=>{
  console.log("Server iniciado");
});