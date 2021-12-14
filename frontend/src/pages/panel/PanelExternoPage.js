import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

export default function PanelExternoPage() {

  const { user } = useContext(AuthContext);

  const btnSolicitarServicio = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/seleccionarServicios", {
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
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const extSolicitarServicio = async (event) => {
    event.preventDefault();
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
        console.log(response);
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
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Usuario</label>
                  <input
                    name="isEmail"
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Contraseña</label>
                  <input
                    name="isPassword"
                    type="password"
                    className="form-control"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Por favor no comparta su contraseña con nadie...
                  </small>
                </div>
                <div className="form-group form-check">
                  <div>
                    <a href="/registro">¿No se ha registrado en el sistema?</a>
                  </div>
                  <div>
                    <a href="/recuperar_password">¿Olvidó su contraseña?</a>
                  </div>
                </div>
              </div>
              <div className="modal-footer modalFoot" align="center">
                <button
                  type="submit"
                  className="btn btn-outline-info my-2 my-sm-0"
                >
                  INGRESAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
