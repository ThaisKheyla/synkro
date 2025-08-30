var express = require("express");
var router = express.Router();

var cadastroEmpresaController = require("../controllers/cadastroEmpresaController.js");

router.post("/cadastrar", function (req, res) {
    cadastroEmpresaController.cadastrar(req, res);
});

module.exports = router;