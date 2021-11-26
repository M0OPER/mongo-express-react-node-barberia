import React from 'react'

export default function Footer() {
  return (
    <div>
      <nav className="navbar-expand-md navbar-dark fixed-bottom bg-dark">

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm" align="left">
              <div className="text-white">
                <a className="text-white" data-toggle="modal" data-target="#modalQuienes">
                  ¿Quiénes somos?
                </a>
              </div>
              <div className="text-white">
                <a href="/preguntas" className="text-white text-decoration-none text-reset">
                  Preguntas frecuentes
                </a>
              </div>
            </div>
            <div className="col-sm" align="right">
              <h6 className="text-white">Creado con ❤ por GRUPO 1 - MISION TIC </h6>
            </div>
          </div>
        </div>

      </nav>
    </div>
  )
}
