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
  return (
    <>
      <General />
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Carousel /> } />
        <Route exact path="/contacto" element={ <ContactoPage /> } />
        <Route exact path="/servicios" element={ <ServiciosPage /> } />
        <Route exact path="/registro" element={ <RegistroPage /> } />
        <Route exact path='/' element={<PrivateRoute/>} auth={true}  >
          <Route exact path="/panel" element={ <PanelPage /> } auth={true} />
        </Route>
        <Route exact path="/logout" element={ <Logout /> } auth={true} />
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
