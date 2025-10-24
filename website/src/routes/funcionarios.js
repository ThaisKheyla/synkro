var express = require("express");
var router = express.Router();
var funcionarioController = require("../controllers/funcionariosController");

router.get("/cargos", funcionarioController.listarCargos);
router.post("/cadastrar", funcionarioController.cadastrarFuncionario);

module.exports = router;
