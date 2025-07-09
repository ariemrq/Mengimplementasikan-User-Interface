// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';

function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Memproses...');
    try {
      const res = await axios.post('https://reqres.in/api/login', form);
      setStatus('Login berhasil!');
      onSuccess();
    } catch (err) {
      setStatus('Email atau password salah');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">Form Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required
          className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required
          className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        {status && <p className="text-sm text-center text-gray-700">{status}</p>}
      </form>
    </div>
  );
}

export default Login;
