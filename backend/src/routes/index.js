const express = require("express");
const pesertaRoutes = require("./pesertaRoutes");
const authRouter = require('./auth')

const router = express.Router();

router.use("/peserta", pesertaRoutes);
router.use("/auth", authRouter)

module.exports = router;
