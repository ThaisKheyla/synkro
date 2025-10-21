var express = require("express");
var router = express.Router();

var mainframesController = require("../controllers/mainframesController");

router.get("/setores", mainframesController.listarSetores);
router.get("/sistemas", mainframesController.listarSistemas);
router.get("/componentes", mainframesController.listarComponentes);

router.post("/", mainframesController.cadastrarMainframe);

router.get("/", mainframesController.listarMainframes);

module.exports = router;
