import { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 bg-blue-600 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">Menu Program</h1>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="hidden lg:flex gap-6 items-center">
          <li><Link to="/" className="hover:underline">Beranda</Link></li>
          <li><Link to="/peserta" className="hover:underline">Data Peserta</Link></li>
        </ul>
      </div>
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Beranda</Link></li>
            <li><Link to="/peserta" onClick={() => setMenuOpen(false)} className="hover:underline">Data Peserta</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
 