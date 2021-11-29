import React, { useState,  useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import ContactoPage from './components/ContactoPage';
import ServiciosPage from './components/ServiciosPage';
import General from './components/General';
import RegistroPage from './components/RegistroPage';
import PanelPage from './components/PanelPage';
import Logout from './components/Logout';
import PrivateRoute from './PrivateRoute';

function App() {

  const [auth, setauth] = useState(false);

  const isLoggedIn = async () => {
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

  return (
    <>
      <General />
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Carousel /> } />
        <Route exact path="/contacto" element={ <ContactoPage /> } />
        <Route exact path="/servicios" element={ <ServiciosPage /> } />
        <Route exact path="/registro" element={ <RegistroPage /> } />
        <Route exact path='/panel' element={<PrivateRoute/>}  >
          <Route exact path='/panel' element={ <PanelPage /> } />
        </Route>
        <Route exact path="/logout" element={ <Logout /> } />
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
