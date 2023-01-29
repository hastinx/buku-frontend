import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import FavoritePage from './pages/favorite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorite' element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
