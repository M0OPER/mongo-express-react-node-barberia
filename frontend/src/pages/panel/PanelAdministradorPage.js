/* eslint-disable no-multi-str */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PanelAdministradorPage() {
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setServicio({ ...servicio, [name]: value });
    setInterno({ ...interno, [name]: value });
    setInternoServicios({ ...internoServicios, [name]: value });
  };

  //CITAS

  const citasTabla = (event) => {
    try {
      var tipoBoton = event.target.attributes.getNamedItem("tipoboton").value;
      if (tipoBoton === "detalles") {
        alert(event.target.attributes.getNamedItem("idcita").value);
      } else if (tipoBoton === "calificacion") {
        alert(event.target.attributes.getNamedItem("idcalificacion").value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cargarCitas = async (event) => {
    try {
      const res = await fetch("/cargarCitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400 || !res) {
        window.alert("No hay citas");
      } else if (res.status === 404) {
        window.alert("No hay citas");
      } else if (res.status === 200) {
        const response = await res.json();
        var citas = "";
        for (let index = 0; index < response.length; index++) {
          citas +=
            '<tr> \
          <th scope="row">' +
            (index + 1) +
            "</th> \
          <td>" +
            response[index]["datosEmpleado"][0].nombres +
            " " +
            response[index]["datosEmpleado"][0].apellidos +
            "</td> \
            <td>" +
            response[index]["datosExterno"][0].nombres +
            " " +
            response[index]["datosExterno"][0].apellidos +
            "</td> \
          <td>" +
            response[index]["datosServicio"][0].ser_nombre +
            "</td> \
            <td class='text-uppercase fw-bold'>" +
            response[index].cit_estado +
            "</td> \
            <td><button tipoboton='detalles' idcita='" +
            response[index]["_id"] +
            "' type='button' class='btn btn-info'>VER DETALLES</button></td> \
            <td><button tipoboton='calificacion' idcalificacion='cal2324' type='button' class='btn btn-warning text-uppercase fw-bold'>" +
            response[index].cit_calificacion +
            "</button></td>";
          citas += "</tr>";
        }
        document.getElementById("tblCitas").innerHTML = citas;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //INTERNOS

  const [interno, setInterno] = useState({
    nombres: "",
    apellidos: "",
    numero_documento: "",
    telefono: "",
    direccion: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [internoServicios, setInternoServicios] = useState({
    si_interno_id: "",
    si_servicio_id: "",
  });

  const internosTabla = (event) => {
    try {
      var tipoBoton = event.target.attributes.getNamedItem("tipoboton").value;
      if (tipoBoton === "detallesServicios") {
        cargarSeleccionarServicio();
        cargarServiciosAsignados(
          event.target.attributes.getNamedItem("idinterno").value
        );
        setInternoServicios({
          ...interno,
          si_interno_id:
            event.target.attributes.getNamedItem("idinterno").value,
        });
      } else if (tipoBoton === "onOff") {
        alert(event.target.attributes.getNamedItem("idinterno").value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cargarSeleccionarServicio = async (event) => {
    try {
      const res = await fetch("/cargarServicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400 || !res) {
        window.alert("No hay servicios");
      } else if (res.status === 404) {
        window.alert("No hay servicios");
      } else if (res.status === 200) {
        const response = await res.json();
        console.log(response);
        var servicios = "<option value='0'>--SELECCIONAR SERVICIO--</option>";
        for (let index = 0; index < response.length; index++) {
          servicios +=
            '<option value="' +
            response[index]["_id"] +
            '">' +
            response[index]["ser_nombre"] +
            " - $" +
            response[index]["ser_costo"] +
            "</option>";
        }
        document.getElementById("seleccionarServicio").innerHTML = servicios;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cargarServiciosAsignados = async (interno) => {
    const id_interno = interno;
    try {
      const res = await fetch("/cargarServiciosAsignados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_interno,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("No hay servicios");
      } else if (res.status === 404) {
        window.alert("No hay servicios");
      } else if (res.status === 200) {
        const response = await res.json();
        console.log(response);
        var serviciosAsignados = "";
        for (let index = 0; index < response.length; index++) {
          serviciosAsignados +=
            ' <button idinterno="' +
            response[index]["_id"] +
            '" idservicio="' +
            response[index]["datoServicio"][0]._id +
            '" type="button" class="btn btn-danger bloquearServicio">$' +
            response[index]["datoServicio"][0].ser_costo +
            " " +
            response[index]["datoServicio"][0].ser_nombre +
            "</button> ";
        }
        document.getElementById("serviciosAsignados").innerHTML =
          serviciosAsignados;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarServicioAsignado = async (event) => {
    try {
      var idinterno = event.target.attributes.getNamedItem("idinterno").value;
      var idservicio = event.target.attributes.getNamedItem("idservicio").value;
      const res = await fetch("/eliminarServicioInterno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idinterno,
          idservicio,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Error");
      } else {
        window.alert("Borrado de la lista");
        cargarServiciosAsignados(idinterno);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const agregarServicioInterno = async (event) => {
    event.preventDefault();
    const { si_interno_id, si_servicio_id } = internoServicios;
    try {
      const res = await fetch("/agregarServicioInterno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          si_interno_id,
          si_servicio_id,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Ya seleccionó el servicio");
      } else {
        window.alert("Registrado con exito");
        cargarServiciosAsignados(si_interno_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cargarInternos = async (event) => {
    //event.preventDefault();
    try {
      const res = await fetch("/cargarInternos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400 || !res) {
        window.alert("No hay internos");
      } else if (res.status === 404) {
        window.alert("No hay internos");
      } else if (res.status === 200) {
        const response = await res.json();
        var internos = "";
        for (let index = 0; index < response.length; index++) {
          internos +=
            '<tr> \
          <th scope="row">' +
            (index + 1) +
            "</th> \
          <td>" +
            response[index]["datosUsuario"][0].nombres +
            " " +
            response[index]["datosUsuario"][0].apellidos +
            "</td> \
          <td>" +
            response[index]["datosUsuario"][0].numero_documento +
            "</td> \
            <td>" +
            response[index]["datosUsuario"][0].email +
            '</td> \
          <td><button tipoboton="detallesServicios" data-bs-toggle="modal" data-bs-target="#modalServiciosInternos" idinterno=' +
            response[index]["_id"] +
            ' type="button" class="btn btn-info detallesServicio">VER DETALLES</button></td>';
          if (response[index]["datosUsuario"][0].estado === "activo") {
            internos +=
              '<td><button idusuario="' +
              response[index]["datosUsuario"][0]._id +
              '" type="button" class="btn btn-success bloquearUsuario">ACTIVO</button></td>';
          } else if (response[index]["datosUsuario"][0].estado === "inactivo") {
            internos +=
              '<td><button idusuario="' +
              response[index]["datosUsuario"][0]._id +
              '" type="button" class="btn btn-danger desbloquearUsuario">INACTIVO</button></td>';
          }
          internos += "</tr>";
        }
        document.getElementById("tblInternos").innerHTML = internos;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const admCrearInterno = async (event) => {
    event.preventDefault();
    const {
      nombres,
      apellidos,
      numero_documento,
      telefono,
      direccion,
      email,
      password1,
      password2,
    } = interno;
    if (
      nombres === "" ||
      apellidos === "" ||
      numero_documento === "" ||
      email === "" ||
      password1 === ""
    ) {
      alert("Por favor rellene todos los campos");
    } else {
      if (password1 !== password2) {
        alert("Las contraseñas no coinciden");
      } else {
        try {
          const res = await fetch("/registrarInterno", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombres,
              apellidos,
              numero_documento,
              telefono,
              direccion,
              email,
              password2,
            }),
          });
          if (res.status === 400 || !res) {
            window.alert("Usuario en uso");
          } else {
            window.alert("Registrado con exito");
            cargarInternos();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  //SERVICIOS

  const [servicio, setServicio] = useState({
    nombre: "",
    costo: "",
    descripcion: "",
  });

  const cargarServicios = async (event) => {
    try {
      const res = await fetch("/cargarServicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400 || !res) {
        window.alert("No hay servicios");
      } else if (res.status === 404) {
        window.alert("No hay servicios");
      } else if (res.status === 200) {
        const response = await res.json();
        console.log(response);
        var servicios = "";
        for (let index = 0; index < response.length; index++) {
          servicios +=
            '<tr> \
          <th scope="row">' +
            (index + 1) +
            "</th> \
          <td>" +
            response[index]["ser_nombre"] +
            "</td> \
          <td>" +
            response[index]["ser_costo"] +
            "</td>";
          if (response[index]["ser_estado"] === "activo") {
            servicios +=
              '<td><button idservicio="' +
              response[index]["_id"] +
              '" type="button" class="btn btn-success bloquearServicio">ACTIVO</button></td>';
          } else if (response[index]["estado"] === "inactivo") {
            servicios +=
              '<td><button idservicio="' +
              response[index]["_id"] +
              '" type="button" class="btn btn-danger desbloquearServicio">INACTIVO</button></td>';
          }
          servicios += "</tr>";
        }
        document.getElementById("tblServicios").innerHTML = servicios;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const intCrearServicio = async (event) => {
    event.preventDefault();
    const { nombre, costo, descripcion } = servicio;
    if (nombre === "" || costo === "") {
      alert("Por favor rellene todos los campos");
    } else {
      try {
        const res = await fetch("/registrarServicio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            costo,
            descripcion,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Ocurrió un error");
        } else {
          window.alert("Registrado con exito");
          cargarServicios();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //EMPLEADOS

  const cargarEmpleados = async (event) => {
    //event.preventDefault();
    try {
      const res = await fetch("/cargarEmpleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400 || !res) {
        window.alert("No hay empleados");
      } else if (res.status === 404) {
        window.alert("No hay empleados");
      } else if (res.status === 200) {
        const response = await res.json();
        var empleados = "";
        for (let index = 0; index < response.length; index++) {
          empleados +=
            '<tr> \
          <th scope="row">' +
            (index + 1) +
            "</th> \
          <td>" +
            response[index]["nombres"] +
            " " +
            response[index]["apellidos"] +
            "</td> \
          <td>" +
            response[index]["numero_documento"] +
            "</td> \
          <td>" +
            response[index]["email"] +
            "</td>";
          if (response[index]["estado"] === "activo") {
            empleados +=
              '<td><button idusuario="' +
              response[index]["_id"] +
              '" type="button" class="btn btn-success bloquearUsuario">ACTIVO</button></td>';
          } else if (response[index]["estado"] === "inactivo") {
            empleados +=
              '<td><button idusuario="' +
              response[index]["_id"] +
              '" type="button" class="btn btn-danger desbloquearUsuario">INACTIVO</button></td>';
          }
          empleados += "</tr>";
        }
        document.getElementById("tblEmpleados").innerHTML = empleados;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //CLIENTES

  const cargarClientes = async (event) => {
    //event.preventDefault();
    try {
      const res = await fetch("/cargarClientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400 || !res) {
        window.alert("No hay clientes");
      } else if (res.status === 404) {
        window.alert("No hay clientes");
      } else if (res.status === 200) {
        const response = await res.json();
        var clientes = "";
        for (let index = 0; index < response.length; index++) {
          clientes +=
            '<tr> \
          <th scope="row">' +
            (index + 1) +
            "</th> \
          <td>" +
            response[index]["nombres"] +
            " " +
            response[index]["apellidos"] +
            "</td> \
          <td>" +
            response[index]["numero_documento"] +
            "</td> \
          <td>" +
            response[index]["email"] +
            "</td>";
          if (response[index]["estado"] === "activo") {
            clientes +=
              '<td><button idusuario="' +
              response[index]["_id"] +
              '" type="button" class="btn btn-success bloquearUsuario">ACTIVO</button></td>';
          } else if (response[index]["estado"] === "inactivo") {
            clientes +=
              '<td><button idusuario="' +
              response[index]["_id"] +
              '" type="button" class="btn btn-danger desbloquearUsuario">INACTIVO</button></td>';
          }
          clientes += "</tr>";
        }
        document.getElementById("tblClientes").innerHTML = clientes;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  cargarCitas();

  return (
    <>
      <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={cargarCitas}
              className="nav-link active"
              id="nav-citas-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-citas"
              type="button"
              role="tab"
              aria-controls="nav-citas"
              aria-selected="true"
            >
              CITAS -
              <FontAwesomeIcon icon="address-book" />
            </button>

            <button
              onClick={cargarInternos}
              className="nav-link"
              id="nav-internos-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-internos"
              type="button"
              role="tab"
              aria-controls="nav-internos"
              aria-selected="false"
            >
              INTERNOS -
              <FontAwesomeIcon icon="user-cog" />
            </button>

            <button
              onClick={cargarServicios}
              className="nav-link"
              id="nav-servicios-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-servicios"
              type="button"
              role="tab"
              aria-controls="nav-servicios"
              aria-selected="false"
            >
              SERVICIOS -
              <FontAwesomeIcon icon="calendar-check" />
            </button>

            <button
              onClick={cargarEmpleados}
              className="nav-link"
              id="nav-empleados-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-empleados"
              type="button"
              role="tab"
              aria-controls="nav-empleados"
              aria-selected="false"
            >
              EMPLEADOS -
              <FontAwesomeIcon icon="user-check" />
            </button>

            <button
              onClick={cargarClientes}
              className="nav-link"
              id="nav-clientes-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-clientes"
              type="button"
              role="tab"
              aria-controls="nav-clientes"
              aria-selected="false"
            >
              CLIENTES -
              <FontAwesomeIcon icon="user-tag" />
            </button>

            <button
              className="nav-link"
              id="nav-reportes-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-reportes"
              type="button"
              role="tab"
              aria-controls="nav-reportes"
              aria-selected="false"
            >
              REPORTES -
              <FontAwesomeIcon icon="clipboard-list" />
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-citas"
            role="tabpanel"
            aria-labelledby="nav-citas-tab"
          >
            <hr></hr>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">EMPLEADO</th>
                  <th scope="col">CLIENTE</th>
                  <th scope="col">SERVICIO</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col">DETALLES - COMENTARIOS</th>
                  <th scope="col">CALIFICACION</th>
                </tr>
              </thead>
              <tbody onClick={citasTabla} id="tblCitas"></tbody>
            </table>
            <hr></hr>
          </div>

          <div
            className="tab-pane fade"
            id="nav-internos"
            role="tabpanel"
            aria-labelledby="nav-internos-tab"
          >
            <hr></hr>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRES</th>
                  <th scope="col">CEDULA</th>
                  <th scope="col">E-MAIL</th>
                  <th scope="col">SERVICIOS</th>
                  <th scope="col">ON / OFF</th>
                </tr>
              </thead>
              <tbody onClick={internosTabla} id="tblInternos"></tbody>
            </table>
            <hr></hr>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalCrearInterno"
              type="button"
              className="btn btn-info ms-auto px-4 rounded-pill btn-lg btnFlotantes"
            >
              CREAR INTERNO
            </button>
          </div>

          <div
            className="tab-pane fade"
            id="nav-servicios"
            role="tabpanel"
            aria-labelledby="nav-servicios-tab"
          >
            <hr></hr>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">COSTO</th>
                  <th scope="col">ON / OFF</th>
                </tr>
              </thead>
              <tbody id="tblServicios"></tbody>
            </table>
            <hr></hr>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalCrearServicio"
              type="button"
              className="btn btn-info ms-auto px-4 rounded-pill btn-lg btnFlotantes"
            >
              CREAR SERVICIO
            </button>
          </div>

          <div
            className="tab-pane fade"
            id="nav-empleados"
            role="tabpanel"
            aria-labelledby="nav-empleados-tab"
          >
            <hr></hr>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRES</th>
                  <th scope="col">CEDULA</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">ON / OFF</th>
                </tr>
              </thead>
              <tbody id="tblEmpleados"></tbody>
            </table>
            <hr></hr>
          </div>

          <div
            className="tab-pane fade"
            id="nav-clientes"
            role="tabpanel"
            aria-labelledby="nav-clientes-tab"
          >
            <hr></hr>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRES</th>
                  <th scope="col">CEDULA</th>
                  <th scope="col">E-MAIL</th>
                  <th scope="col">ON / OFF</th>
                </tr>
              </thead>
              <tbody id="tblClientes"></tbody>
            </table>
            <hr></hr>
          </div>

          <div
            className="tab-pane fade"
            id="nav-reportes"
            role="tabpanel"
            aria-labelledby="nav-reportes-tab"
          >
            <h1>REPORTES</h1>
          </div>
        </div>
      </div>

      <form onSubmit={admCrearInterno} method="POST">
        <div
          className="modal fade"
          id="modalCrearInterno"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header modalHead">
                <h5 className="modal-title" id="exampleModalLabel">
                  CREAR USUARIO INTERNO
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        name="nombres"
                        value={interno.nombres}
                        onChange={handleInput}
                        type="text"
                        className="form-control"
                        placeholder="Nombres"
                        autoFocus
                        maxLength="150"
                      />
                    </div>
                    <div className="col">
                      <input
                        name="apellidos"
                        value={interno.apellidos}
                        onChange={handleInput}
                        type="text"
                        className="form-control"
                        placeholder="Apellidos"
                        required
                        maxLength="150"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <select className="form-control" disabled>
                        <option value="0">CEDULA</option>
                      </select>
                    </div>

                    <div className="col">
                      <input
                        name="numero_documento"
                        value={interno.numero_documento}
                        onChange={handleInput}
                        type="number"
                        className="form-control"
                        placeholder="Numero de documento"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        name="email"
                        value={interno.email}
                        onChange={handleInput}
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Correo electronico"
                        autoComplete="off"
                        maxLength="450"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        No compartiremos tu correo con nadie más.
                      </small>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        name="telefono"
                        value={interno.telefono}
                        onChange={handleInput}
                        type="number"
                        className="form-control"
                        placeholder="Telefono"
                      />
                    </div>
                    <div className="col">
                      <input
                        name="direccion"
                        value={interno.direccion}
                        onChange={handleInput}
                        type="text"
                        className="form-control"
                        placeholder="Direccion"
                        maxLength="450"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        name="password1"
                        value={interno.password1}
                        onChange={handleInput}
                        type="password"
                        className="form-control"
                        placeholder="Escriba la contraseña"
                        maxLength="50"
                      />
                    </div>
                    <div className="col">
                      <input
                        name="password2"
                        value={interno.password2}
                        onChange={handleInput}
                        type="password"
                        className="form-control"
                        placeholder="Confirma la contraseña"
                        maxLength="50"
                      />
                    </div>
                  </div>
                  <small id="passwordHelp" className="form-text text-muted">
                    La contraseña debe tener mas de 7 caracteres.
                  </small>
                </div>
              </div>
              <div className="modal-footer modalFoot" align="center">
                <div id="msgRegistro"></div>
                <button
                  id="regRegistrar"
                  type="submit"
                  className="btn btn-verde"
                >
                  ENVIAR REGISTRO
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={intCrearServicio} method="POST">
        <div
          className="modal fade"
          id="modalCrearServicio"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header modalHead">
                <h5 className="modal-title" id="exampleModalLabel">
                  CREAR SERVICIO
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        name="nombre"
                        value={servicio.nombre}
                        onChange={handleInput}
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        autoFocus
                        maxLength="150"
                      />
                    </div>
                    <div className="col">
                      <input
                        name="costo"
                        value={servicio.costo}
                        onChange={handleInput}
                        type="number"
                        className="form-control"
                        placeholder="Costo"
                        required
                        maxLength="150"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <textarea
                        name="descripcion"
                        value={servicio.descripcion}
                        onChange={handleInput}
                        className="form-control"
                        rows="2"
                        placeholder="Descripcion del servicio"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer modalFoot" align="center">
                <div id="msgRegistro"></div>
                <button
                  id="regRegistrar"
                  type="submit"
                  className="btn btn-verde"
                >
                  ENVIAR REGISTRO
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div
        className="modal fade"
        id="modalServiciosInternos"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modalHead">
              <h5 className="modal-title" id="exampleModalLabel">
                ASIGNAR SERVICIOS
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <select
                      id="seleccionarServicio"
                      name="si_servicio_id"
                      value={internoServicios.si_servicio_id}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="0">--SELECCIONAR SERVICIO--</option>
                    </select>
                  </div>

                  <div className="col">
                    <button
                      onClick={agregarServicioInterno}
                      className="btn btn-warning"
                      type="button"
                      role="tab"
                      aria-controls="nav-citas"
                      aria-selected="true"
                    >
                      AGREGAR SERVICIO
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <strong>SERVICIOS ASIGNADOS</strong>
                <hr></hr>
                <div className="row">
                  <div
                    onClick={eliminarServicioAsignado}
                    id="serviciosAsignados"
                    className="col"
                  >
                    No hay datos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
