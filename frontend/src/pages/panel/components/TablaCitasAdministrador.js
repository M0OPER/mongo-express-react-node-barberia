import React, { useEffect, useState } from "react";

const TablaCitasAdministrador = () => {
  const [citas, setCitas] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/cargarCitas", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCitas(data);
      });
      alert("hola")
  }, []);

  const handleButton = () => {
    alert("Hola!!");
  };

  return citas ? (
    <>
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
        <tbody>
          {citas.map((cita) => {
            return (
              <tr>
                <td>1</td>
                <td>
                  {cita.datosEmpleado[0].nombres}{" "}
                  {cita.datosEmpleado[0].apellidos}
                </td>
                <td>
                  {cita.datosExterno[0].nombres}{" "}
                  {cita.datosExterno[0].apellidos}
                </td>
                <td>{cita.datosServicio[0].ser_nombre}</td>
                <td>{cita.datosServicio[0].ser_nombre}</td>
                <td>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#modalDetallesCita"
                    tipoboton="detalles"
                    idcita={cita.datosServicio[0].ser_nombre}
                    type="button"
                    class="btn btn-info"
                  >
                    VER DETALLES
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning text-uppercase fw-bold"
                  >
                    {cita.cit_calificacion}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="modalDetallesCita"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modalHead">
              <h5 className="modal-title" id="exampleModalLabel">
                DETALLES SERVICIO
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
                      type="date"
                      className="form-control"
                      placeholder="FECHA"
                    />
                  </div>
                </div>
                <small className="form-text text-muted">
                  Seleccione los empleados disponibles
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
    </>
  ) : null;
};

export default TablaCitasAdministrador;
