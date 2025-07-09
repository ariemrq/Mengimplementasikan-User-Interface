import { Link } from 'react-router-dom';

function Navbar({ onOpenLogin, onOpenRegister }) {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">Menu Program</h1>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:underline">Beranda</Link></li>
          <li><Link to="/peserta" className="hover:underline">Data Peserta</Link></li>
          <li><button onClick={onOpenLogin} className="hover:underline">Login</button></li>
          <li><button onClick={onOpenRegister} className="hover:underline">Register</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
 