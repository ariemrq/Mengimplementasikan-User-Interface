import { useContext, useEffect, useState } from 'react';
import { baseUrl } from "../config/constants";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import Table from '../components/Table';
import Button from '../components/Button';
import Form from '../components/Form';
import Swal from "sweetalert2";

function DataPeserta() {
  const [peserta, setPeserta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPeserta, setSelectedPeserta] = useState(null);
  const [mode, setMode] = useState("create");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/peserta`);
      const dataWithNo = res.data.data.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setPeserta(dataWithNo);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setSelectedPeserta(null);
    setMode("create");
    setShowForm(true);
  };

  const handleUpdate = (peserta) => {
    setSelectedPeserta(peserta);
    setMode("edit");
    setShowForm(true);
  };

  const handleRead = (peserta) => {
    setSelectedPeserta(peserta);
    setMode("view");
    setShowForm(true);
  };

  const handleDelete = async (peserta) => {
    const konfirmasi = confirm(`Hapus ${peserta.name}?`);
    if (!konfirmasi) return;
    try {
      await axios.delete(`${baseUrl}/peserta/${peserta.id}`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      fetchData();
      Swal.fire("Berhasil", "Peserta telah dihapus", "success");
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      let res; 
      if (mode === "edit" && selectedPeserta) {
        await axios.put(`${baseUrl}/peserta/${selectedPeserta.id}`, formData, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      } else {
        await axios.post(`${baseUrl}/peserta`, formData, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      }
      setShowForm(false);
      fetchData();
      Swal.fire({
      title: res?.data?.message || "Data berhasil disimpan",
      icon: "success",
    });
    } catch (err) {
      console.error("Error saving:", err.response?.data || err.message);
      Swal.fire({
        title: "Gagal menyimpan data",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    }
  };

  const columns = [
    { header: 'No.', accessor: 'no' },
    { header: 'Nama', accessor: 'name' },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Aksi',
      accessor: 'actions',
      render: (row) => (
        <div className="flex gap-2">
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

      {showForm && (
        <Form
          data={selectedPeserta}
          mode={mode}
          onSubmit={handleSubmitForm}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default DataPeserta;
