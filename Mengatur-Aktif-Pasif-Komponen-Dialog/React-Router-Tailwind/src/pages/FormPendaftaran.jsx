import { useState } from 'react';
import { baseUrl } from "../config/constants";
import axios from 'axios';

function Pendaftaran() {
  const [form, setForm] = useState({ nama: '', email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Mengirim...');
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, form);
      setStatus(`User ${res.data.data.nama} berhasil dibuat`);
    } catch (err) {
      setStatus('Gagal mengirim data');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">Form Pendaftaran</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="nama" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange} required
          className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required
          className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required
          className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Kirim</button>
      </form>
      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}
export default Pendaftaran;
