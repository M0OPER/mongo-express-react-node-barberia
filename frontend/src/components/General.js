import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";

const General = () => {
  const { dispatch } = useContext(AuthContext);

  const [user, setUser] = useState({
    isEmail: "",
    isPassword: "",
  });

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { isEmail, isPassword } = user;
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isEmail,
          isPassword,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Usuario o contraseña incorrecta");
      } else if (res.status === 404) {
        window.alert("Pagina no encontrada");
      } else if (res.status === 200) {
        const response = await res.json();
        console.log(response);
        try {
          dispatch({
            type: types.login,
            payload: {
              user: response["user_id"],
              name: response["nombres"],
              role: response["role"],
            },
          });
          window.location.reload();
        } catch (error) {
          window.alert("Error dentro del servidor");
        }
      } else {
        window.alert("Error dentro del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <div
          className="modal fade"
          id="modalSesion"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header modalHead">
                <h5 className="modal-title" id="exampleModalLabel">
                  INICIO DE SESION
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
                    value={user.isEmail}
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Contraseña</label>
                  <input
                    name="isPassword"
                    value={user.isPassword}
                    onChange={handleChange}
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
    </div>
  );
};

export default General;
