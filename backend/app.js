const dotenv = require("dotenv");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
const port = process.env.PORT;

const Usuarios = require("./models/usuariosTabla");
const Administradores = require("./models/administradoresTabla");
const Externos = require("./models/externosTabla");
const authenticate = require("./middleware/authenticate");
const Citas = require("./models/citasTabla");

const cargarUsuario = async () => {
  const resultado = await Usuarios.agregate([
    {
      $lockup: {
        from: "empleados",
        localField: "_id",
        foreignField: "emp_usuario_id",
        as: "datosUsuarios",
      },
    },
  ]);
  console.log(resultado);
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.isEmail;
    const password = req.body.isPassword;
    const user = await Usuarios.findOne({ email: email });
    if (user) {
      const isWorking = await bcryptjs.compare(password, user.password);
      if (isWorking) {
        let datos = null;
        if (user["role"] === "administrador") {
          datos = await Administradores.findOne({
            adm_usuario_id: user["_id"],
          });
        } else if (user["role"] === "interno") {
        } else if (user["role"] === "empleado") {
        } else if (user["role"] === "externo") {
          datos = await Externos.findOne({
            ext_usuario_id: user["_id"],
          });
        }
        const token = await user.generateToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).json({
          user_id: datos["_id"],
          nombres: user["nombres"] + " " + user["apellidos"],
          role: user["role"],
        });
      } else {
        res.status(400).send("USUARIO O CONTRASEÑA INCORRECTA");
      }
    } else {
      res.status(400).send("USUARIO O CONTRASEÑA INCORRECTA");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/auth", authenticate, (req, res) => {});

app.post("/registrarUsuario", async (req, res) => {
  try {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const numero_documento = req.body.numero_documento;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const email = req.body.email;
    const password = req.body.password2;

    const createUser = new Usuarios({
      nombres: nombres,
      apellidos: apellidos,
      numero_documento: numero_documento,
      telefono: telefono,
      direccion: direccion,
      email: email,
      password: password,
      role: "externo",
    });

    const created = await createUser.save();

    const id_usuario = created["_id"];

    const createExterno = new Externos({
      ext_usuario_id: id_usuario,
    });

    const createdExterno = await createExterno.save();

    res.status(200).send("HECHO");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/logout", async (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("Sesion cerrada con exito");
});

app.post("/cargarCitas", async (req, res) => {
  try {
    const datos = await Citas.find();
    if (datos) {
      res.status(200).json(datos);
    } else {
      res.status(400).send("No hay citas");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log("Server iniciado");
});
