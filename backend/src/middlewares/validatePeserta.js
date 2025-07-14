const validatePeserta = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      data: null,
      message: "Name peserta wajib diisi.",
      status: "error",
    });
  }

  next();
};

module.exports = validatePeserta;
