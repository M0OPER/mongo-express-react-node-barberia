import { Routes, Route } from 'react-router-dom';
import PanelPage from '../components/PanelPage';

export const PanelRoutes = () => {
  return (
    <>
      <div className="container mt-2">
        <Routes>
          <Route path="/panel" element={<PanelPage />} />
        </Routes>
      </div>
    </>
  );
};
