/* eslint-disable no-multi-str */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";

export default function PanelExternoPage() {
  var today = new Date();
  const fecha_hoy =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() + 1);
  const { user } = useContext(AuthContext);

  const [horas, setHoras] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/cargarHorario", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let id_hora = [];
        for (let index = 0; index < data.length; index++) {
          id_hora.push({
            id: data[index]["_id"],
            hora: data[index]["hor_hora"],
          });
        }
        setHoras(id_hora);
      });
  }, []);

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCita({ ...cita, [name]: value });
  };

  //CITAS
  const [cita, setCita] = useState({
    externo: user["user"],
    servicio: "",
    empleado: "",
    fecha: "",
    hora: "",
  });

  const btnSolicitarServicio = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/cargarServicios", {
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

  const seleccionarEmpleado = async (event) => {
    event.preventDefault();
    const { servicio } = cita;
    try {
      const res = await fetch("/seleccionarEmpleado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          servicio,
        }),
      });
      if (res.status === 400 || !res) {
        console.log("No hay servicio");
      } else if (res.status === 404) {
        console.log("No hay servicio");
      } else if (res.status === 200) {
        const response = await res.json();
        var empleados = "<option value='0'>--SELECCIONAR EMPLEADO--</option>";
        for (let index = 0; index < response.length; index++) {
          empleados +=
            '<option value="' +
            response[index]["empleados"]._id +
            '">' +
            response[index]["datosEmpleado"][0].nombres +
            " " +
            response[index]["datosEmpleado"][0].apellidos +
            "</option>";
        }
        document.getElementById("seleccionarEmpleado").innerHTML = empleados;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const seleccionarHorario = async (event) => {
    event.preventDefault();
    try {
      const { empleado, fecha } = cita;
      const res = await fetch("/seleccionarHorario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empleado,
          fecha,
        }),
      });
      if (res.status === 400 || !res) {
        console.log("No hay servicio");
      } else if (res.status === 404) {
        console.log("No hay servicio");
      } else if (res.status === 200) {
        const response = await res.json();
        let horarios = [];
        var horasDisponibles = [];
        horasDisponibles = horas;
        for (let index = 0; index < response.length; index++) {
          horarios.push({
            id: response[index]["datosCita"][0]._id,
            hora: response[index]["datosCita"][0].hor_hora,
          });
        }
        for (let index = 0; index < horarios.length; index++) {
          var horasDisponibles = horasDisponibles.filter(function (id) {
            return id.id !== horarios[index].id;
          });
        }
        var selectHora = "<option value='0'>--SELECCIONAR HORA--</option>";
        for (let index = 0; index < horasDisponibles.length; index++) {
          selectHora +=
            '<option value="' +
            horasDisponibles[index].id +
            '">' +
            horasDisponibles[index].hora +
            "</option>";
        }
        document.getElementById("seleccionarHora").innerHTML = selectHora;
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const extSolicitarServicio = async (event) => {
    event.preventDefault();
    const { externo, empleado, servicio, horario, fecha } = cita;
    if (fecha === "") {
      alert("Por favor rellene todos los campos");
    } else {
      try {
        const res = await fetch("/registrarCita", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            externo,
            empleado,
            servicio,
            horario,
            fecha,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Mal");
        } else {
          window.alert("Registrado con exito");
          cargarCitasExterno();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cargarCitasExterno = async (event) => {
    const id_externo = user["user"];
    try {
      const res = await fetch("/cargarCitasExterno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_externo,
        }),
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
            response[index]["datosServicio"][0].ser_nombre +
            "</td> \
            <td class='text-uppercase fw-bold'>" +
            response[index]["cita"].cit_estado +
            "</td> \
            <td>" +
            response[index]["numero_documento"] +
            "</td> \
            <td>" +
            response[index]["numero_documento"] +
            "</td> \
            <td>" +
            response[index]["role"] +
            "</td>";
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

  cargarCitasExterno();

  return (
    <>
      <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={cargarCitasExterno}
              className="nav-link active"
              id="nav-citas-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-citas"
              type="button"
              role="tab"
              aria-controls="nav-citas"
              aria-selected="true"
            >
              CITAS
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
                  <th scope="col">SERVICIO</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col">CANCELAR</th>
                  <th scope="col">COMENTARIOS</th>
                  <th scope="col">CALIFICACION</th>
                </tr>
              </thead>
              <tbody id="tblCitas">
                <tr>
                  <th scope="row">NO HAY CITAS</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
          </div>
        </div>
      </div>
      <button
        onClick={btnSolicitarServicio}
        data-bs-toggle="modal"
        data-bs-target="#modalSolicitarServicio"
        id="mdlSolicitarServicio"
        type="button"
        className="btn btn-info ms-auto px-4 rounded-pill btn-lg btnFlotantes"
      >
        SOLICITAR SERVICIO
      </button>
      <form onSubmit={extSolicitarServicio} method="POST">
        <div
          className="modal fade"
          id="modalSolicitarServicio"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header modalHead">
                <h5 className="modal-title" id="exampleModalLabel">
                  SOLICITAR SERVICIO
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
                        value={user["name"]}
                        type="text"
                        className="form-control"
                        placeholder="Nombres"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <select
                        id="seleccionarServicio"
                        name="servicio"
                        value={cita.servicio}
                        onInput={handleInput}
                        onChange={seleccionarEmpleado}
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
                      <select
                        id="seleccionarEmpleado"
                        name="empleado"
                        value={cita.empleado}
                        onChange={handleInput}
                        className="form-control"
                      >
                        <option value="0">--SELECCIONAR EMPLEADO--</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <input
                        name="fecha"
                        min={fecha_hoy}
                        value={cita.fecha}
                        onChange={handleInput}
                        type="date"
                        className="form-control"
                        placeholder="FECHA"
                      />
                    </div>
                    <div className="col">
                      <div className="d-grid gap-2">
                        <button
                          onClick={seleccionarHorario}
                          className="btn btn-primary"
                          type="button"
                        >
                          VERIFICAR
                        </button>
                      </div>
                    </div>
                  </div>
                  <small className="form-text text-muted">
                    Presiona verificar para cargar horario disponible
                  </small>
                </div>

                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <select
                        id="seleccionarHora"
                        name="horario"
                        value={cita.horario}
                        onChange={handleInput}
                        className="form-control"
                      >
                        <option value="0">--SELECCIONAR HORARIO--</option>
                      </select>
                    </div>
                  </div>
                  <small className="form-text text-muted">
                    Seleccione los empleados y horas disponibles
                  </small>
                </div>
              </div>
              <div className="modal-footer modalFoot" align="center">
                <button
                  type="submit"
                  className="btn btn-outline-info my-2 my-sm-0"
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
