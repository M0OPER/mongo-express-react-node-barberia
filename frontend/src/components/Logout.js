import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

  const navigate = useNavigate();

  const logout = async() => {
    try {
      const res = await fetch('/logout', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      })
      if (res.status === 401 || !res) {
        window.alert("Por favor intentelo mas tarde")
      }else if(res.status === 400){
        window.alert("error");
      }
      else{
        window.alert("Sesion cerrada con exito")
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    logout();
  }, [])

  return (
    <div></div>
  );

}

export default Logout;