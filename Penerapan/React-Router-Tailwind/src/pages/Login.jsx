import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../config/constants";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

function Login({ onClose }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Memproses...');
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, form);
      const { accessToken } = res.data;
      const dataLogin = { accessToken, email: form.email };

      localStorage.setItem("user", JSON.stringify(dataLogin));
      setUser(dataLogin);
      setStatus('Login berhasil!');
      if (onClose) onClose();
      navigate('/');
    } catch (err) {
      setStatus('Email atau password salah');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-8">
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
