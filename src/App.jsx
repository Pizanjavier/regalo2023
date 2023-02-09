import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Prueba1 from './pages/Prueba1/Prueba1';
import Prueba2 from './pages/Prueba2/Prueba2';
import Prueba3 from './pages/Prueba3/Prueba3';
import PruebaFinal from './pages/PruebaFinal/PruebaFinal';
import Welcome from './pages/Welcome/Welcome';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="prueba1" element={<Prueba1 />} />
          <Route path="prueba2" element={<Prueba2 />} />
          <Route path="prueba3" element={<Prueba3 />} />
          <Route path="prueba-final" element={<PruebaFinal />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
