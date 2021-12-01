import { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext )
    alert(user["role"])
    
    return user.logged
        ? children
        : <Navigate to="/" />
}