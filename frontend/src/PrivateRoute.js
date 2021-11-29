import { Navigate, Outlet } from "react-router-dom"
import useAuth from "./auth/useAuth";

const PrivateRoute = () => {
  const auth = useAuth();
  window.alert(auth);
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute
