import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataPeserta from './pages/DataPeserta';
import Laporan from './pages/Laporan';
import Pendaftaran from './pages/FormPendaftaran';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peserta" element={<DataPeserta />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/logout" element={<div>Anda telah logout.</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
