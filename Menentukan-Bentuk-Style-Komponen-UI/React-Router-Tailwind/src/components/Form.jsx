import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";

function Form({ data = {}, mode = "create", onSubmit, onClose }) {
  const [form, setForm] = useState({ name: "", status: "aktif" });

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
      setForm({
        name: data?.name || "",
        status: data?.status || "aktif",
      });
    } else {
      setForm({ name: "", status: "aktif" });
    }
  }, [data?.id, mode]);

  const isReadOnly = mode === "view";

  const title =
    mode === "create"
      ? "Tambah Peserta"
      : mode === "edit"
      ? "Edit Peserta"
      : "Detail Peserta";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReadOnly) {
      onSubmit(form);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-blue-700 mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama Peserta"
            required
            readOnly={isReadOnly}
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={isReadOnly}
            className="p-2 border rounded"
          >
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
          {!isReadOnly && (
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
