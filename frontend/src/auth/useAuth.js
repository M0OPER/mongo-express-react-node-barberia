import React, { createContext, useEffect } from "react";

const AuthContext = createContext();

function useAuth() {
  
  const [authed, setAuthed] = React.useState(true);

  return {
    authed,
    login(email, password) {
      return new Promise((res) => {
        const isEmail = email;
        const isPassword = password;
        try {
          const res =  fetch('/login', {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              isEmail, isPassword
            })
          });
          if (res.status === 400 || !res) {
            window.alert("Usuario o contraseña incorrecta");
          } else if (res.status === 404){
            window.alert("Pagina no encontrada");
          }else {
            setAuthed(true);
          }
        } catch (error) {
          console.error(error);
        }
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}