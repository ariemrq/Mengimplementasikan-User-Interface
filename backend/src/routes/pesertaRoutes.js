const express = require("express");
const {
    createPeserta,
    getPeserta,
    getPesertaByID,
    updatePeserta,
    deletePeserta,
} = require("../controllers/pesertaController");
const validatePeserta = require("../middlewares/validatePeserta");
const { authenticateJWT } = require('../middlewares/auth');

const router = express.Router();

router.get("/", getPeserta);
router.get("/:id", getPesertaByID);
router.post("/", authenticateJWT, validatePeserta, createPeserta);
router.put("/:id", authenticateJWT, validatePeserta, updatePeserta);
router.delete("/:id", authenticateJWT, deletePeserta);

module.exports = router;
