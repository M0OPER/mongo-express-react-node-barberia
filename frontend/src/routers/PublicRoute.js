import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export const PublicRoute = ({ children }) => {

  return children;

};
