import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";

export const Navbar = () => {

  const { user } = useContext(AuthContext);

  let panel = null;
  let iniciarSesion = null;
  let cerrarSesion = null;
  let welcome = null;

  if (!user.logged) {
    iniciarSesion = (
      <button
        type="button"
        className="btn btn-outline-info ms-auto px-4 rounded-pill"
        data-bs-toggle="modal"
        data-bs-target="#modalSesion"
      >
        INICIAR SESION
      </button>
    );
  } else {
    panel = (
      <NavLink
        className="btn btn-outline-info ms-auto px-4 rounded-pill"
        to="/panel"
      >
        PANEL
      </NavLink>
    );
    cerrarSesion = (
      <NavLink
        className="btn btn-outline-info ms-auto px-4 rounded-pill"
        to="/logout"
      >
        CERRAR SESION
      </NavLink>
    );
    welcome = (
      <button
        id="welcome"
        type="button"
        className="btn btn-secondary btn-sm"
      >{user["name"] + " - " + user["role"]}</button>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="#">
            Vikingos Barber Club
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  INICIO
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/servicios">
                  SERVICIOS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">
                  CONTACTO
                </NavLink>
              </li>
              <li className="nav-item">
                {panel}
                {iniciarSesion}
                {cerrarSesion}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {welcome}
    </div>
  );
};
