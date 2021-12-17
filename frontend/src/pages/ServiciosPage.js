import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import General from "../components/General";

const ServiciosPage = () => {
  const [servicios, setServicios] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/cargarServicios", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setServicios(data);
      });
  }, []);

  return servicios ? (
    <>
      <General />
      <Navbar />
      {servicios.map((servicio) => {
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{servicio.ser_nombre}</h5>
              <p className="card-text">{servicio.ser_descripcion}</p>
              <a className="btn btn-primary">${servicio.ser_costo}</a>
            </div>
          </div>
        );
      })}
      <Footer />
    </>
  ) : null;
};

export default ServiciosPage;
