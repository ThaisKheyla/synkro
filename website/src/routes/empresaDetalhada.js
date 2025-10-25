const express = require("express");
const router = express.Router();
const controller = require("../controllers/empresaDetalhadaController");

// Rota para listar todas as empresas
router.get("/listarTodas", controller.listarTodasEmpresas);

// Rota para detalhes de uma empresa específica
router.get("/detalhes/:id", controller.buscarDetalhes);

module.exports = router;
