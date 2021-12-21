import React from "react";

export default function Footer() {
  return (
    <div>
      <nav className="navbar-expand-md navbar-dark fixed-bottom bg-dark">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm" align="left">
              <div className="text-white">
                <a
                  className="text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#modalQuienes"
                >
                  ¿Quiénes somos?
                </a>
              </div>
              <div className="text-white">
                <a
                  href="/preguntas"
                  className="text-white text-decoration-none text-reset"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPreguntas"
                >
                  Preguntas frecuentes
                </a>
              </div>
            </div>
            <div className="col-sm" align="right">
              <h6 className="text-white">
                Creado con ❤ por GRUPO 1 - MISION TIC{" "}
              </h6>
            </div>
          </div>
        </div>
      </nav>

      <div
        class="modal fade"
        id="modalQuienes"
        tabindex="-1"
        aria-labelledby="quienesModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="quienesModalLabel">
                ¿Quiénes somos?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <dl>
                      <dt>
                        <h2 class="text-center">
                          <span class="bd-content-title">Sobre Nosotros</span>
                        </h2>
                      </dt>
                      <dd>
                        <br />
                        <p>
                          La barbería VIKINGOS BARBER CLUB nace de la necesidad
                          y el sentir de mejorar la calidad de estética y
                          presentación de los habitantes de la ciudad de
                          Barranquilla. Para lograr tal objetivo buscamos el
                          apoyo del sector privado y publico para financiar este
                          maravilloso proyecto.
                        </p>
                        <p>
                          En el año 2010 se dio la apertura en la ciudad de
                          Barranquilla ofreciendo servicios en cortes de
                          cabello, barbería y peinados. Hoy en día le ofrecemos
                          a la ciudad la mayoría de los servicios que se
                          requieren de acuerdo con estudios de caracterización.
                        </p>
                        <p>
                          Nos encontramos en una excelente zona de la ciudad
                          (localidad norte centro histórico del distrito de
                          Barranquilla, Cra 53 # 79-45) y con amplia variedad de
                          rutas y vías para llegar a ella.{" "}
                        </p>
                        <br />
                      </dd>
                    </dl>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <h2 class="text-center">
                      <span class="bd-content-title">Equipo de Trabajo</span>
                    </h2>
                    <br />
                  </div>
                </div>
                <div class="row">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac tortor neque. Mauris sollicitudin ut ligula ut faucibus. Sed mattis enim ut massa posuere hendrerit. Ut a ornare quam. Ut elementum sit amet urna vitae placerat. Aliquam a arcu nec augue sollicitudin imperdiet a tincidunt tellus. Morbi in erat in lorem lobortis bibendum in bibendum eros. Morbi fermentum elementum orci, et faucibus leo fermentum luctus. In vel erat metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pellentesque massa ex, non posuere massa mollis ac.
                </div>
                <br />

                <div class="row">
                  <div class="col-md-4 text-center">
                    <img
                      class="rounded mx-auto d-block img-fluid"
                      alt="Doctores"
                      src="https://1.bp.blogspot.com/-u51_l060-Ms/XZVKoicE-gI/AAAAAAAAPmI/zzZJKcsxrXIZDMrECUxxa_J6-wHrp3dtwCLcBGAsYHQ/s1600/FB_IMG_1569780769473.jpg"
                    />
                  </div>
                  <div class="col-md-8">
                    <dl>
                      <dt>Misión</dt>
                      <dd>
                        Para el año 2025 la barbería VIKINGOS BARBER CLUB será
                        una entidad de estética y presentación inovadora líder a
                        nivel local, regional y nacional que brinda un excelente
                        e integro servicio a toda la población en Colombia
                        teniendo sedes en las ciudades capitales del país.
                      </dd>
                      <dt>Visión</dt>
                      <dd>
                        Somos una barbería con vocación, amor y ética
                        profesional que brinda un servicio de calidad en
                        presentación y estética a todos los estratos sociales de
                        la ciudad de barranquilla.
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalPreguntas"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="modalPreguntas"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalPreguntas">
                Preguntas Frecuentes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="list-group col-md-12">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿Cómo aparto una cita?
                    </a>
                    <a
                      href="#"
                      class="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿Teléfono y correo para pedir citas?
                    </a>
                    <a
                      href="#"
                      class="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿Cómo solicito mi cita por la página web?
                    </a>
                    <a
                      href="#"
                      class="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿Horario de atención?
                    </a>
                    <a
                      href="#"
                      class="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿Que tipos de servicios brinda la barbería?
                    </a>
                    <a
                      href="#"
                      class="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿La barbería presta servicios a domicilio?
                    </a>
                    <a
                      href="#"
                      class="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿La barbería presta servicios para niños?
                    </a>
                    <a
                      href="#"
                      class="list-group-item list-group-item-action text-decoration-none text-reset"
                    >
                      ¿Cuales son las sedes de la barbería?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
