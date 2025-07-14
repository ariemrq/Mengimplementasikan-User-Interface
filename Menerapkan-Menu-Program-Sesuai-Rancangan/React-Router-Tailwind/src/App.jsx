import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Footer from './components/Footer';
import Home from './pages/Home';
import DataPeserta from './pages/DataPeserta';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peserta" element={<DataPeserta />} />
          </Routes>
        </Layout>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
