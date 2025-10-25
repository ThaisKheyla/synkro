var express = require("express");
var router = express.Router();
var funcionarioController = require("../controllers/funcionariosController");

router.get("/cargos", funcionarioController.listarCargos);
router.post("/cadastrar", funcionarioController.cadastrarFuncionario);

router.get("/empresa/:idEmpresa", funcionarioController.listarPorEmpresa);
router.get("/:idFuncionario", funcionarioController.obterFuncionario);
router.put("/:idFuncionario", funcionarioController.atualizarFuncionario);
router.delete("/:idFuncionario", funcionarioController.deletarFuncionario);

module.exports = router;
