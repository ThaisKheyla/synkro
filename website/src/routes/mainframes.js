var express = require("express");
var router = express.Router();

var mainframesController = require("../controllers/mainframesController");

router.get("/setores/:idEmpresa", mainframesController.listarSetores);
router.get("/sistemas", mainframesController.listarSistemas);
router.get("/componentes", mainframesController.listarComponentes);
router.get("/tipos", mainframesController.listarTipos);

router.post("/setores", mainframesController.cadastrarSetor);
router.post("/sistemas", mainframesController.cadastrarSistema);
router.post("/componentes", mainframesController.cadastrarComponente);
router.post("/tipos", mainframesController.cadastrarTipo);

router.post("/", mainframesController.cadastrarMainframe);

router.get("/empresa/:idEmpresa", mainframesController.listarPorEmpresa);
router.get("/visaoGeral/:idEmpresa", mainframesController.visaoGeralPorEmpresa);

router.get("/", mainframesController.listarMainframes);

router.get("/alertasPorMainframe/:fkEmpresa", function (req, res) {
    mainframesController.contarAlertasPorMainframe(req, res);
});

module.exports = router;
