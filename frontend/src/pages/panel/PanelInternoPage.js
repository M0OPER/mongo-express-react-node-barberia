/* eslint-disable no-multi-str */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PanelInternoPage() {
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setServicio({ ...servicio, [name]: value });
    setEmpleado({ ...empleado, [name]: value });
  };

  //CITAS -------------------------------------------------------
  const intCargarCitas = async (event) => {
    try {
      const res = await fetch("/cargarCitas", {
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
        var servicios = "";
        for (let index = 0; index < response.length; index++) {
          servicios +=
            '<tr> \
          <th scope="row">' +
            (index + 1) +
            "</th> \
          <td>" +
            response[index]["nombre"] +
            "</td> \
          <td>" +
            response[index]["costo"] +
            "</td>";
          if (response[index]["estado"] === "activo") {
            servicios +=
              '<td><button idservicio="' +
              response[index]["_id"] +
              '" type="button" className="btn btn-success bloquearServicio">ACTIVO</button></td>';
          } else if (response[index]["estado"] === "inactivo") {
            servicios +=
              '<td><button idservicio="' +
              response[index]["_id"] +
              '" type="button" className="btn btn-danger desbloquearServicio">INACTIVO</button></td>';
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

  //EMPLEADOS-------------------------------------------------

  const btnCrearEmpleado = async (event) => {
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
        var servicios = "";
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
        document.getElementById("servicio").innerHTML = servicios;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [empleado, setEmpleado] = useState({
    nombres: "",
    apellidos: "",
    numero_documento: "",
    servicio: "",
    telefono: "",
    direccion: "",
    email: "",
    password1: "",
    password2: "",
  });

  const intCrearEmpleado = async (event) => {
    event.preventDefault();
    const {
      nombres,
      apellidos,
      numero_documento,
      servicio,
      telefono,
      direccion,
      email,
      password1,
      password2,
    } = empleado;
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
          const res = await fetch("/registrarEmpleado", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombres,
              apellidos,
              numero_documento,
              servicio,
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
            cargarEmpleados();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const cargarEmpleados = async (event) => {
    try {
      const res = await fetch("/cargarEmpleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 400 || !res) {
        window.alert("No hay Empleados");
      } else if (res.status === 404) {
        window.alert("No hay Empleados");
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
            response[index]["role"] +
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

  //SERVICIOS

  const [servicio, setServicio] = useState({
    nombre: "",
    costo: "",
    descripcion: "",
  });

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

  return (
    <>
      <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={intCargarCitas}
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
                  <th scope="col">NOMBRES</th>
                  <th scope="col">CEDULA</th>
                  <th scope="col">ROLE</th>
                  <th scope="col">ON / OFF</th>
                </tr>
              </thead>
              <tbody id="tblCitas">
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
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
                  <th scope="col">ROLE</th>
                  <th scope="col">ON / OFF</th>
                </tr>
              </thead>
              <tbody id="tblEmpleados">
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
            <button
              onClick={btnCrearEmpleado}
              data-bs-toggle="modal"
              data-bs-target="#modalCrearEmpleado"
              type="button"
              className="btn btn-info ms-auto px-4 rounded-pill btn-lg btnFlotantes"
            >
              CREAR EMPLEADO
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
              <tbody id="tblServicios">
                <tr>
                  <th scope="row">NO HAY DATOS</th>
                </tr>
              </tbody>
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
        </div>
      </div>
      <form onSubmit={intCrearEmpleado} method="POST">
        <div
          className="modal fade"
          id="modalCrearEmpleado"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header modalHead">
                <h5 className="modal-title" id="exampleModalLabel">
                  CREAR EMPLEADO
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
                        value={empleado.nombres}
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
                        value={empleado.apellidos}
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
                        value={empleado.numero_documento}
                        onChange={handleInput}
                        type="number"
                        className="form-control"
                        placeholder="Numero de documento"
                        required
                      />
                    </div>

                    <div className="col">
                      <select
                        id="servicio"
                        name="servicio"
                        value={empleado.servicio}
                        onChange={handleInput}
                        className="form-control"
                      >
                        <option value="0">--SELECCIONAR SERVICIO--</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        name="email"
                        value={empleado.email}
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
                        value={empleado.telefono}
                        onChange={handleInput}
                        type="number"
                        className="form-control"
                        placeholder="Telefono"
                      />
                    </div>
                    <div className="col">
                      <input
                        name="direccion"
                        value={empleado.direccion}
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
                        value={empleado.password1}
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
                        value={empleado.password2}
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
    </>
  );
}
