import express from "express";
import { login, register, getUsers, createUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/users", verifyToken, getUsers);
router.post("/users", verifyToken, createUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
