import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../config/Constants";
import { AuthContext } from "../context/AuthContext";
import Form from "../components/Form";
import Swal from "sweetalert2";

function FormPeserta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [mode, setMode] = useState("create");

  useEffect(() => {
    if (location.pathname.includes("/view/")) {
      setMode("view");
    } else if (id) {
      setMode("edit");
    } else {
      setMode("create");
    }

    if (id) {
      fetchPeserta();
    }
  }, [id, location.pathname]);

  const fetchPeserta = async () => {
    try {
      const res = await axios.get(`${baseUrl}/peserta/${id}`);
      setData(res.data.data);
    } catch (err) {
      Swal.fire("Gagal", "Data tidak ditemukan", "error");
      navigate("/peserta");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (mode === "edit") {
        await axios.put(`${baseUrl}/peserta/${id}`, formData, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      } else {
        await axios.post(`${baseUrl}/peserta`, formData, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
      }

      Swal.fire("Sukses", "Data berhasil disimpan", "success");
      navigate("/peserta");
    } catch (err) {
      Swal.fire("Gagal", err?.response?.data?.message || "Error", "error");
    }
  };

  return (
    <div className="p-6">
      <Form
        data={data}
        mode={mode}
        onSubmit={handleSubmit}
        onClose={() => navigate("/peserta")}
      />
    </div>
  );
}

export default FormPeserta;
