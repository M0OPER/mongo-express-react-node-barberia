import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import General from "../components/General";
import { Navbar } from "../components/Navbar";

const RegistroPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nombres: "",
    apellidos: "",
    numero_documento: "",
    telefono: "",
    direccion: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      nombres,
      apellidos,
      numero_documento,
      telefono,
      direccion,
      email,
      password1,
      password2,
    } = user;
    if (
      nombres === "" ||
      apellidos === "" ||
      numero_documento === "" ||
      email === "" ||
      password1 === ""
    ) {
      alert("Por favor rellene todos los campos");
    } else {
      if (password1 !== password2) {
        alert("Las contraseñas no coinciden");
      } else {
        try {
          const res = await fetch("/registrarUsuario", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombres,
              apellidos,
              numero_documento,
              telefono,
              direccion,
              email,
              password2,
            }),
          });
          if (res.status === 400 || !res) {
            window.alert("Usuario en uso");
          } else {
            window.alert("Registrado con exito");
            navigate("/inicio");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <General />
      <Navbar />
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
                          type="text"
                          className="form-control"
                          placeholder="Nombres"
                          autoFocus
                          maxLength="150"
                        />
                      </div>
                      <div className="col">
                        <input
                          name="apellidos"
                          value={user.apellidos}
                          onChange={handleInput}
                          type="text"
                          className="form-control"
                          placeholder="Apellidos"
                          required
                          maxLength="150"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <select className="form-control" disabled>
                          <option value="0">CEDULA</option>
                        </select>
                      </div>
                      <div className="col">
                        <input
                          name="numero_documento"
                          value={user.numero_documento}
                          onChange={handleInput}
                          type="number"
                          className="form-control"
                          placeholder="Numero de documento"
                          required
                        />
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
                          maxLength="450"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                          No compartiremos tu correo con nadie más.
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <input
                          name="telefono"
                          value={user.telefono}
                          onChange={handleInput}
                          type="number"
                          className="form-control"
                          placeholder="Telefono"
                        />
                      </div>
                      <div className="col">
                        <input
                          name="direccion"
                          value={user.direccion}
                          onChange={handleInput}
                          type="text"
                          className="form-control"
                          placeholder="Direccion"
                          maxLength="450"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <input
                          name="password1"
                          value={user.password1}
                          onChange={handleInput}
                          type="password"
                          className="form-control"
                          placeholder="Escriba la contraseña"
                          maxLength="50"
                        />
                      </div>
                      <div className="col">
                        <input
                          name="password2"
                          value={user.password2}
                          onChange={handleInput}
                          type="password"
                          className="form-control"
                          placeholder="Confirma la contraseña"
                          maxLength="50"
                        />
                      </div>
                    </div>
                    <small id="passwordHelp" className="form-text text-muted">
                      La contraseña debe tener mas de 7 caracteres.
                    </small>
                  </div>
                </div>
                <div className="modal-footer modalFoot" align="center">
                  <div id="msgRegistro"></div>
                  <button
                    id="regRegistrar"
                    type="submit"
                    className="btn btn-verde"
                  >
                    ENVIAR REGISTRO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegistroPage;
