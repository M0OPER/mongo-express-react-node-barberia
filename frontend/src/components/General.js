import React from 'react'

export default function General() {
  return (
    <div>
      <div className="modal fade" id="modalSesion" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header modalHead">
        <h5 className="modal-title" id="exampleModalLabel">INICIO DE SESION</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Usuario</label>
    <input id="isEmail" type="email" className="form-control"  aria-describedby="emailHelp" />
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Contraseña</label>
    <input id="isPassword" type="password" className="form-control" />
    <small id="emailHelp" className="form-text text-muted">Por favor no comparta su contraseña con nadie...</small>
  </div>
  <div className="form-group form-check">
  	<div><a href="/registro">¿No se ha registrado en el sistema?</a></div>
  	<div><a href="/recuperar_password">¿Olvidó su contraseña?</a></div>    
  </div>
</form>
      </div>
      <div className="modal-footer modalFoot" align="center">
        <button type="button" className="btn btn-outline-info my-2 my-sm-0">INGRESAR</button>
      </div>
    </div>
  </div>
</div>
  </div>
  )
}
