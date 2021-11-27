import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegistroPage = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nombres, apellidos, email, password } = user;
    try {
      const res = await fetch('/registrarExterno', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombres, apellidos, email, password
        })
      })
      if (res.status === 400 || !res) {
        window.alert("Usuario en uso");
      } else if (res.status === 404){
        window.alert("Pagina no encontrada");
      }else {
        window.alert("Registrado con exito");
        navigate('/inicio')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
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
                      <input
                        name="nombres"
                        value={user.nombres}
                        onChange={handleInput}
                        type="text" className="form-control" placeholder="Nombres" autoFocus maxLength="150" />
                    </div>
                    <div className="col">
                      <input
                        name="apellidos"
                        value={user.apellidos}
                        onChange={handleInput}
                        type="text"
                        className="form-control" placeholder="Apellidos" required maxLength="150" />
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
                      <input
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Correo electronico"
                        autoComplete="off"
                        maxLength="450" />
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
                      <input id="password1" type="password" className="form-control" placeholder="Contraseña" aria-describedby="passwordHelp" maxLength="50" />
                    </div>
                    <div className="col">
                      <input
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        type="password"
                        className="form-control"
                        placeholder="Confirma contraseña"
                        maxLength="50" />
                    </div>
                  </div>
                  <small id="passwordHelp" className="form-text text-muted">La contraseña debe tener mas de 7 caracteres.</small>
                </div>
              </div>
              <div className="modal-footer modalFoot" align="center">
                <div id="msgRegistro"></div>
                <button id="regRegistrar" type="submit" className="btn btn-verde">ENVIAR REGISTRO</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegistroPage;