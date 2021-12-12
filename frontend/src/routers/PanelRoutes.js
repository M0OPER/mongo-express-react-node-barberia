import { Routes, Route } from "react-router-dom";
import Panel from "../components/Panel";
import NotFoundPage from "../pages/NotFoundPage";

export const PanelRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/panel" element={<Panel />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
