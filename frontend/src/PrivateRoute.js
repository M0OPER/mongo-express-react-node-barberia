import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = ( {auth} ) => {
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute
