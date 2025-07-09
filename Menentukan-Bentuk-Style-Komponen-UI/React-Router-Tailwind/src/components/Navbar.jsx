import { Link } from 'react-router-dom';

function Navbar({ onOpenLogin }) {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">Menu Program</h1>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:underline">Beranda</Link></li>
          <li><Link to="/peserta" className="hover:underline">Data Peserta</Link></li>
          <li><Link to="/laporan" className="hover:underline">Laporan</Link></li>
          <li><button onClick={onOpenLogin} className="hover:underline">Login</button></li>
          <li><Link to="/pendaftaran" className="hover:underline">Pendaftaran</Link></li>
          <li><Link to="/logout" className="hover:underline">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
 