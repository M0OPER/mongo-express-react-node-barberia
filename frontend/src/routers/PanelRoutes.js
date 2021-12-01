import { Routes, Route } from "react-router-dom";
import PanelPage from "../components/PanelPage";

export const PanelRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/panel" element={<PanelPage />} />
      </Routes>
    </>
  );
};
