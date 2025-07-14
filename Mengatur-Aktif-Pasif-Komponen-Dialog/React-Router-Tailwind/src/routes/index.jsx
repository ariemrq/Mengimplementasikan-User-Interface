import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import DataPeserta from '../pages/DataPeserta';
import Register from '../pages/FormPendaftaran';
import Login from '../pages/Login';
import Layout from '../components/Layout';
import Footer from '../components/Footer';


export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const {user} = useContext(AuthContext);

  const LoginRoute = ({children})=>{
    if (user === null){
      return children
    }else{
      return <Navigate to="/"/>
    }
  }
  
  const PrivateRoute = ({children})=>{
    if (user === null){
      return <Navigate to="/login"/>
    }else{
      return children
    }
  }

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
            <LoginRoute><Login onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} onClose={() => setShowLogin(false)}/></LoginRoute>
          </div>
        </div>
      )}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peserta" element={<PrivateRoute><DataPeserta /></PrivateRoute>}/>
            <Route path="/register" element={<LoginRoute><Register /></LoginRoute>}/>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Layout>
        <Footer/>
    </BrowserRouter>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
