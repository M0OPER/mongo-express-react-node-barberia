import React, {useState} from 'react'

const RegistroPage = () => {

  const [user, setUser] = useState(null)

  return (
    <div>
      <div tabIndex="-1">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header modalHead">
        REGISTRO AL SISTEMA
      </div>
      <div className="modal-body">

        <div className="mb-3">
         <div className="row">
         <div className="col">
          <input id="regNombres" name="regNombres" type="text" className="form-control" placeholder="Nombres" autoFocus maxLength="150" />
         </div>
         <div className="col">
          <input id="regApellidos" name="regApellidos" type="text" className="form-control" placeholder="Apellidos" required maxLength="150" />
         </div>
        </div>
        </div>

        <div className="mb-3">
        <div className="row">
         <div className="col">
          <select id="regTipoDocumento" className="form-control">
            <option value="0">--Tipo de documento--</option>
          </select>
         </div>
         <div className="col">
          <input id="regNumeroDocumento" type="number" className="form-control" placeholder="Numero de documento" required />
         </div>
        </div>
       </div>

       <div className="mb-3">
        <div className="row">
         <div className="col">
          <input id="regEmail" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Correo electronico" autoComplete="off" maxLength="450" />
          <small id="emailHelp" className="form-text text-muted">No compartiremos tu correo con nadie más.</small>
         </div>
        </div>
       </div>

       <div className="mb-3">
        <div className="row">
         <div className="col">
          <input id="regTelefono" type="number" className="form-control" placeholder="Telefono" />
         </div>
         <div className="col">
          <input id="regDireccion" type="text" className="form-control" placeholder="Direccion" maxLength="450" />
         </div>
        </div>
       </div>

       <div className="mb-3">
        <div className="row">
         <div className="col">
          <input id="regPassword1" type="password" className="form-control" placeholder="Contraseña" aria-describedby="passwordHelp" maxLength="50" />
         </div>
         <div className="col">
          <input id="regPassword2" type="password" className="form-control" placeholder="Confirma contraseña" maxLength="50" />
         </div>
        </div>
        <small id="passwordHelp" className="form-text text-muted">La contraseña debe tener mas de 7 caracteres.</small>
       </div>

      </div>
      <div className="modal-footer modalFoot" align="center">
       <div id="msgRegistro"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="regRegistrar" type="" className="btn btn-verde" disabled>ENVIAR REGISTRO</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default RegistroPage;