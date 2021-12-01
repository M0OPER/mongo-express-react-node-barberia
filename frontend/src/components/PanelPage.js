import React from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import General from "./General";

export default function PanelPage() {
  return (
    <>
      <General />
      <Navbar />
      <div>
        <h1>PAGINA DE PANEL</h1>
      </div>
      <Footer />
    </>
  );
}
