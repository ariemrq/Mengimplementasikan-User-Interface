import { db } from "../models/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = (req, res) => {
  const { nama, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",
    [nama, email, hashed],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Registrasi berhasil" });
    }
  );
};

// Login
export const login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json(err);
    if (rows.length === 0) return res.status(401).json({ message: "Email tidak ditemukan" });

    const user = rows[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, nama: user.nama, email: user.email } });
  });
};

// Ambil semua user
export const getUsers = (req, res) => {
  db.query("SELECT id, nama, email, status FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Tambah user (admin only)
export const createUser = (req, res) => {
  const { nama, email, password, status } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.query(
    "INSERT INTO users (nama, email, password, status) VALUES (?, ?, ?, ?)",
    [nama, email, hashed, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "User ditambahkan" });
    }
  );
};

// Hapus user
export const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User dihapus" });
  });
};
