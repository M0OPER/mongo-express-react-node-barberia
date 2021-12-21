/* eslint-disable no-multi-str */
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../auth/AuthContext";

export default function PanelInternoPage() {
  const { user } = useContext(AuthContext);
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setServicio({ ...servicio, [name]: value });
    setEmpleado({ ...empleado, [name]: value });
  };

  //CITAS -------------------------------------------------------

  const citasTabla = (event) => {
    try {
      //cargarDetallesServicio(event.target.attributes.getNamedItem("idservicio").value);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarCitas = async (event) => {
    try {
      const id_interno = user["user"];
      const res = await fetch("/cargarCitasInterno", {
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
          <td>$" +
            response[index]["datosServicio"][0].ser_costo +
            " " +
            response[index]["datosServicio"][0].ser_nombre +
            "</td> \
            <td class='text-uppercase fw-bold'>" +
            response[index]["cita"].cit_estado +
            "</td> \
            <td><button data-bs-toggle='modal' data-bs-target='#modalDetallesCita' tipoboton='detalles' idcita='" +
            response[index]["cita"]["_id"] +
            "' type='button' class='btn btn-info'>VER DETALLES</button></td> \
            <td><button tipoboton='calificacion' idcalificacion='cal2324' type='button' class='btn btn-warning text-uppercase fw-bold'>" +
            response[index]["cita"].cit_calificacion +
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

  //EMPLEADOS-------------------------------------------------

  const btnCrearEmpleado = async (event) => {
    try {
      const id_interno = user["user"];
      const res = await fetch("/cargarServiciosInternos", {
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
        var servicios = "";
        for (let index = 0; index < response.length; index++) {
          servicios +=
            '<option value="' +
            response[index]["datoServicio"][0]._id +
            '">' +
            response[index]["datoServicio"][0].ser_nombre +
            " - $" +
            response[index]["datoServicio"][0].ser_costo +
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

  const empleadosTabla = (event) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const cargarEmpleados = async (event) => {
    //event.preventDefault();
    try {
      const id_interno = user["user"];
      const res = await fetch("/cargarEmpleadosInternos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_interno,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("No hay empleados");
      } else if (res.status === 404) {
        window.alert("No hay empleados");
      } else if (res.status === 200) {
        const response = await res.json();
        console.log(response);
        var empleados = "";
        for (let index = 0; index < response.length; index++) {
          empleados +=
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
            response[index]["datosEmpleado"][0].numero_documento +
            "</td> \
            <td>" +
            response[index]["datosEmpleado"][0].email +
            '</td> \
          <td><button tipoboton="detallesEmpleado" data-bs-toggle="modal" data-bs-target="#modalDetallesUsuario" idempleado=' +
            response[index]["_id"] +
            ' type="button" class="btn btn-warning">INFORMACION</button></td>';

          empleados += "</tr>";
          empleados +=
            '<tr><td colspan="5"><div class="accordion" id="accordionExample"><div class="accordion-item"> \
            <h2 class="accordion-header" id="headingTwo"> \
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"  data-bs-target="#acc_' +
            (index + 1) +
            '" aria-expanded="false" aria-controls="acc_' +
            (index + 1) +
            '"> \
                DETALLES DEL SERVICIO \
              </button> \
            </h2> \
            <div id="acc_' +
            (index + 1) +
            '" class="accordion-collapse collapse" aria-labelledby="headingTwo"  data-bs-parent="#accordionExample"> \
              <div class="accordion-body"> \
                <div><strong>NOMBRE: </strong><span>' +
            response[index]["ser_nombre"] +
            "</span></div> \
                <div><strong>COSTO: </strong><span>$" +
            response[index]["ser_costo"] +
            "</span></div> \
                <div><strong>DURACION: </strong><span>" +
            response[index]["ser_duracion"] +
            " Minutos</span></div> \
              </div> \
            </div> \
          </div></div></td><tr>";
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
    id: "",
    nombre: "",
    costo: "",
    descripcion: "",
    duracion: "",
  });

  const serviciosTabla = (event) => {
    try {
      cargarDetallesServicio(
        event.target.attributes.getNamedItem("idservicio").value
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cargarDetallesServicio = async (servicio) => {
    const id_servicio = servicio;
    try {
      const res = await fetch("/cargarDetallesServicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_servicio,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("No hay detalles");
      } else if (res.status === 404) {
        window.alert("No hay detalles");
      } else if (res.status === 200) {
        const response = await res.json();
        setServicio({
          id: response[0]._id,
          nombre: response[0].ser_nombre,
          costo: response[0].ser_costo,
          descripcion: response[0].ser_descripcion,
          duracion: response[0].ser_duracion,
        });
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cargarServicios = async (event) => {
    const id_interno = user["user"];
    try {
      const res = await fetch("/cargarServiciosInternos", {
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
        var servicios = "";
        for (let index = 0; index < response.length; index++) {
          servicios +=
            '<tr> \
          <th scope="row">' +
            (index + 1) +
            "</th> \
          <td>" +
            response[index]["datoServicio"][0].ser_nombre +
            "</td> \
          <td>" +
            response[index]["datoServicio"][0].ser_costo +
            "</td>\
            <td>" +
            response[index]["datoServicio"][0].ser_descripcion +
            "</td>";
          if (response[index]["datoServicio"][0].ser_estado === "activo") {
            servicios +=
              '<td><button type="button" class="btn btn-success">ACTIVO</button></td>';
          } else if (
            response[index]["datoServicio"][0].ser_estado === "inactivo"
          ) {
            servicios +=
              '<td><button type="button" class="btn btn-danger">INACTIVO</button></td>';
          }
          servicios +=
            '<td scope="row"><button idservicio="' +
            response[index]["datoServicio"][0]._id +
            '" type="button" data-bs-toggle="modal" data-bs-target="#modalConfigurarServicio" class="btn btn-info">VER DETALLES</button</td>';
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

  const guardarCambiosServicio = async (event) => {
    event.preventDefault();
    const { id, costo, descripcion, duracion } = servicio;
    if (costo === "" || duracion === "") {
      alert("Por favor rellene los campos costo y duracion del servicio");
    } else {
      try {
        const res = await fetch("/guardarCambiosServicio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            costo,
            descripcion,
            duracion,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Error al guardar");
        } else {
          window.alert("Datos guardados con exito");
          cargarServicios();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-reportes-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-reportes"
              type="button"
              role="tab"
              aria-controls="nav-reportes"
              aria-selected="true"
            >
              REPORTES -
              <FontAwesomeIcon icon="clipboard-list" />
            </button>

            <button
              onClick={cargarCitas}
              className="nav-link"
              id="nav-citas-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-citas"
              type="button"
              role="tab"
              aria-controls="nav-citas"
              aria-selected="false"
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
            id="nav-reportes"
            role="tabpanel"
            aria-labelledby="nav-reportes-tab"
          >
            <h1>REPORTES</h1>
          </div>

          <div
            className="tab-pane fade"
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
                  <th scope="col">DETALLES USUARIO</th>
                </tr>
              </thead>
              <tbody onClick={empleadosTabla} id="tblEmpleados"></tbody>
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
                  <th scope="col">DESCRIPCION</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col">CONFIGURAR</th>
                </tr>
              </thead>
              <tbody onClick={serviciosTabla} id="tblServicios">
                <tr>
                  <th scope="row">NO HAY DATOS</th>
                </tr>
              </tbody>
            </table>
            <hr></hr>
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

      <div
        className="modal fade"
        id="modalConfigurarServicio"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modalHead">
              <h5 className="modal-title" id="exampleModalLabel">
                CONFIGURAR SERVICIO
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
                      id="serNombre"
                      name="nombre"
                      value={servicio.nombre}
                      onChange={handleInput}
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      disabled
                      maxLength="150"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      id="serCosto"
                      name="costo"
                      value={servicio.costo}
                      onChange={handleInput}
                      type="number"
                      className="form-control"
                      placeholder="Costo"
                      min="10000"
                      max="1000000"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <input
                      id="serDescripcion"
                      name="descripcion"
                      value={servicio.descripcion}
                      onChange={handleInput}
                      type="text"
                      className="form-control"
                      placeholder="Descripcion"
                      maxLength="150"
                    />
                  </div>
                  <div className="col-2">
                    <input
                      id="serDuracion"
                      name="duracion"
                      value={servicio.duracion}
                      onChange={handleInput}
                      type="number"
                      className="form-control"
                      placeholder="Duracion"
                      min="30"
                      max="60"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MINUTOS"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer modalFoot" align="center">
              <div id="msgRegistro"></div>
              <button
                onClick={guardarCambiosServicio}
                id="regRegistrar"
                type="button"
                className="btn btn-primary"
              >
                GUARDAR CAMBIOS
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
