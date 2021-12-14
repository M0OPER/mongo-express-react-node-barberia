import React, { useContext } from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import General from "./General";
import { AuthContext } from "../auth/AuthContext";
import PanelAdministradorPage from "../pages/panel/PanelAdministradorPage";
import PanelExternoPage from "../pages/panel/PanelExternoPage";
import PanelInternoPage from "../pages/panel/PanelInternoPage";


export default function Panel() {

  const { user } = useContext(AuthContext);

  var panel = null;

  if (user["role"] === "administrador") {
    panel = <PanelAdministradorPage />
  }else if (user["role"] === "interno") {
    panel = <PanelInternoPage />
  }else if (user["role"] === "externo") {
    panel = <PanelExternoPage />
  }

  return (
    <>
      <General />
      <Navbar />
      {panel}
      <Footer />
    </>
  );
}
