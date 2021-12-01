import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from './auth/useAuth'

const PrivateRoute = ({ children }) => {

  const { authed } = useAuth();
  const location = useLocation();

  return authed === true 
    ? <Outlet /> 
    : <Navigate to="/" replace state={{ path: location.pathname }} />;
}

export default PrivateRoute
