import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataPeserta from './pages/DataPeserta';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onOpenLogin={() => setShowLogin(true)} onOpenRegister={() => setShowRegister(true)}/>
      {showLogin && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setShowLogin(false)}
            >
              &times;
            </button>
            <Login onSwitchToRegister={() => {setShowLogin(false); setShowRegister(true);}}/>
          </div>
        </div>
      )}
      {showRegister && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setShowRegister(false)}
            >
              &times;
            </button>
            <Register onSwitchToLogin={() => {setShowRegister(false); setShowLogin(true);}}/>
          </div>
        </div>
      )}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peserta" element={<DataPeserta />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
