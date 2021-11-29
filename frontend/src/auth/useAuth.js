import React, { useState,  useEffect } from 'react'

function useAuth() {

  const [auth, setauth] = useState(false);

  const isLoggedIn = async () =>{
    try {
      const res = await fetch('/auth', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      });
      if (res.status === 200) {
        setauth(true)
      }
      if (res.status === 401) {
        setauth(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, [])

  return auth;
}

export default useAuth;
