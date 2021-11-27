import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="#">Vikingos Barber Club</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">INICIO</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/panel">PANEL</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">CONTACTO</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="btn btn-outline-info ms-auto px-4 rounded-pill" to="/panel">PANEL</NavLink>
              <button type="button" class="btn btn-outline-info ms-auto px-4 rounded-pill" data-bs-toggle="modal" data-bs-target="#modalSesion">INICIAR SESION</button>
              <NavLink className="btn btn-outline-info ms-auto px-4 rounded-pill" to="/logout">CERRAR SESION</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
