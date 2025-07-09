import { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

function Login({ onSwitchToRegister }) {
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
        <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <Button type="submit" variant="primary">Kirim</Button>
        {status && <p className="text-sm text-center text-gray-700">{status}</p>}
        <div className="text-center mt-4">
        <p className="text-sm">
          Belum punya akun?
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:underline ml-1"
          >
            Registrasi disini
          </button>
        </p>
      </div>
      </form>
    </div>
  );
}

export default Login;
