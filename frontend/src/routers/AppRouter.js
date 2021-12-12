import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactoPage from "../pages/ContactoPage";
import ServiciosPage from "../pages/ServiciosPage";
import RegistroPage from "../pages/RegistroPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { PanelRoutes } from "./PanelRoutes";
import InicioPage from "../pages/InicioPage";
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
          path="/servicios"
          element={
            <PublicRoute>
              <ServiciosPage />
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
          path="/registro"
          element={
            <PublicRoute>
              <RegistroPage />
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
