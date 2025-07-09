import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Button from '../components/Button';

function DataPeserta() {
  const [peserta, setPeserta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/peserta');
      setPeserta(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    const nama = prompt('Masukkan nama peserta');
    const email = prompt('Masukkan email');
    if (!nama || !email) return;
    try {
      await axios.post('http://localhost:3001/api/peserta', {
        nama,
        email,
        status: 'Aktif',
      });
      fetchData();
    } catch (err) {
      alert('Gagal menambahkan peserta');
    }
  };

  const handleUpdate = async (p) => {
    const namaBaru = prompt('Ubah nama:', p.nama);
    if (!namaBaru) return;
    try {
      await axios.put(`http://localhost:3001/api/peserta/${p.id}`, {
        nama: namaBaru,
      });
      fetchData();
    } catch (err) {
      alert('Gagal mengupdate data');
    }
  };

  const handleDelete = async (p) => {
    const konfirmasi = confirm(`Hapus ${p.nama}?`);
    if (!konfirmasi) return;
    try {
      await axios.delete(`http://localhost:3001/api/peserta/${p.id}`);
      fetchData();
    } catch (err) {
      alert('Gagal menghapus data');
    }
  };

  const handleRead = (p) => {
    alert(`📋 ${p.nama}\nEmail: ${p.email}\nStatus: ${p.status}`);
  };

  const columns = [
    { header: 'Nama', accessor: 'nama' },
    { header: 'Email', accessor: 'email' },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Aksi',
      accessor: 'actions',
      render: (row) => (
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={() => handleRead(row)}>View</Button>
          <Button variant="success" onClick={() => handleUpdate(row)}>Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(row)}>Hapus</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Data Peserta</h2>
      <div className="mb-4">
        <Button onClick={handleCreate}>+ Tambah Peserta</Button>
      </div>
      {loading ? <p>Loading...</p> : <Table columns={columns} data={peserta} />}
    </div>
  );
}

export default DataPeserta;
