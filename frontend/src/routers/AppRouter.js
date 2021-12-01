import { BrowserRouter, Routes, Route } from "react-router-dom";

import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import NotFoundPage from "../components/NotFoundPage";
import ContactoPage from "../components/ContactoPage";
import ServiciosPage from "../components/ServiciosPage";
import General from "../components/General";
import RegistroPage from "../components/RegistroPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { PanelRoutes } from "./PanelRoutes";
import InicioPage from "../components/InicioPage";
import Logout from "../components/Logout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <InicioPage />
            </PublicRoute>
          }
        />

        <Route
          path="/contacto"
          element={
            <PublicRoute>
              <ContactoPage />
            </PublicRoute>
          }
        />

        <Route
          path="/logout"
          element={
            <PublicRoute>
              <Logout />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <PanelRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
