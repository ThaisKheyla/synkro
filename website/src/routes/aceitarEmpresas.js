var express = require("express");
var router = express.Router();

var aceitarEmpresasController = require("../controllers/aceitarEmpresasController");


router.post("/buscarCards", function (req, res) {
    aceitarEmpresasController.buscar_cards(req, res);
});

router.put("/statusEmpresa", function (req, res) {
    aceitarEmpresasController.editar(req, res);
});

module.exports = router;