const dotenv = require("dotenv");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
const port = process.env.PORT;

const authenticate = require("./middleware/authenticate");
const Usuarios = require("./models/usuariosTabla");
const Administradores = require("./models/administradoresTabla");
const Internos = require("./models/internosTabla");
const Empleados = require("./models/empleadosTabla");
const Externos = require("./models/externosTabla");
const Servicios = require("./models/serviciosTabla");
const Citas = require("./models/citasTabla");

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
          datos = await Internos.findOne({
            int_usuario_id: user["_id"],
          });
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
          //login_id: user["_id"],
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

app.get("/logout", async (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("Sesion cerrada con exito");
});

//USUARIOS INTERNOS
app.post("/cargarInternos", async (req, res) => {
  try {
    const datos = await Usuarios.find(
      { role: "interno" },
      "nombres apellidos numero_documento role estado"
    );
    if (datos) {
      res.status(200).json(datos);
    } else {
      res.status(400).send("No hay internos");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/registrarInterno", async (req, res) => {
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
      role: "interno",
      estado: "activo",
    });

    const created = await createUser.save();

    const id_usuario = created["_id"];

    const createInterno = new Internos({
      int_usuario_id: id_usuario,
    });

    const createdExterno = await createInterno.save();

    res.status(200).send("HECHO");
  } catch (error) {
    res.status(400).send(error);
  }
});

//EMPLEADOS ---------------------------------------------------

app.post("/cargarEmpleados", async (req, res) => {
  try {
    const datos = await Usuarios.find(
      { role: "empleado" },
      "nombres apellidos numero_documento role estado"
    );
    if (datos) {
      res.status(200).json(datos);
    } else {
      res.status(400).send("No hay Empleados");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/registrarEmpleado", async (req, res) => {
  try {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const numero_documento = req.body.numero_documento;
    const servicio = req.body.servicio;
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
      role: "empleado",
      estado: "activo",
    });

    const created = await createUser.save();

    const id_usuario = created["_id"];

    const createEmpleado = new Empleados({
      emp_usuario_id: id_usuario,
      emp_servicio_id: servicio,
    });

    const createdEmpleado = await createEmpleado.save();

    res.status(200).send("HECHO");
  } catch (error) {
    res.status(400).send(error);
  }
});

//EMPLEADOS HACE PARTE DE CITAS

app.post("/seleccionarEmpleado", async (req, res) => {
  const servicio = req.body.servicio;
  console.log(servicio);
  try {
    const datos = await Servicios.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(servicio),
        },
      },
      {
        $lookup: {
          from: "empleados",
          localField: "_id",
          foreignField: "emp_servicio_id",
          as: "empleados",
        },
      },
      {
        $unwind: "$empleados",
      },
      {
        $lookup: {
          from: "usuarios",
          localField: "empleados.emp_usuario_id",
          foreignField: "_id",
          as: "datosEmpleado",
        },
      },
    ]);

    console.log(datos);
    if (datos) {
      res.status(200).json(datos);
    } else {
      res.status(400).send("No hay servicios");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//USUARIOS EXTERNOS -------------------------------------------

app.post("/registrarExterno", async (req, res) => {
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
      estado: "activo",
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

//SERVICIOS -----------------------------------------------

app.post("/cargarServicios", async (req, res) => {
  try {
    const datos = await Servicios.find();
    if (datos) {
      res.status(200).json(datos);
    } else {
      res.status(400).send("No hay servicios");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/registrarServicio", async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const costo = req.body.costo;
    const descripcion = req.body.descripcion;

    const createServicio = new Servicios({
      ser_nombre: nombre,
      ser_costo: costo,
      ser_descripcion: descripcion,
      ser_estado: "activo",
    });

    const created = await createServicio.save();

    res.status(200).send("HECHO");
  } catch (error) {
    res.status(400).send(error);
  }
});

//CITAS ----------------------------------------------------

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

app.post("/cargarCitasExterno", async (req, res) => {
  const externo = req.body.id_externo;
  try {
    const datos = await Externos.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(externo),
        },
      },
      {
        $lookup: {
          from: "citas",
          localField: "_id",
          foreignField: "cit_externo_id",
          as: "cita",
        },
      },
      {
        $unwind: "$cita",
      },
      {
        $lookup: {
          from: "empleados",
          localField: "cita.cit_empleado_id",
          foreignField: "_id",
          as: "empleado",
        },
      },
      {
        $unwind: "$empleado",
      },
      {
        $lookup: {
          from: "usuarios",
          localField: "empleado.emp_usuario_id",
          foreignField: "_id",
          as: "datosEmpleado",
        },
      },
      {
        $lookup: {
          from: "servicios",
          localField: "empleado.emp_servicio_id",
          foreignField: "_id",
          as: "datosServicio",
        },
      },
    ]);

    console.log(datos);
    //console.log(datosCitas);
    if (datos) {
      res.status(200).json(datos);
    } else {
      res.status(400).send("No hay citas");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.post("/registrarCita", async (req, res) => {
  try {
    const externo = req.body.externo;
    const empleado = req.body.empleado;
    const fecha = req.body.fecha;

    const createCita = new Citas({
      cit_externo_id: externo,
      cit_empleado_id: empleado,
      cit_fecha: fecha,
      cit_estado: "espera",
    });

    const created = await createCita.save();

    res.status(200).send("HECHO");
  } catch (error) {
    res.status(400).send(error);
  }
});

//PUERTO ---------------------------------------------------

app.listen(port, () => {
  console.log("Server iniciado");
});
