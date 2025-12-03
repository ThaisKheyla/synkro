var express = require("express");
var router = express.Router();

var mainframesController = require("../controllers/mainframesController");
const alertaController = require('../controllers/alertaController');

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
router.get("/statusComponentes/:fkEmpresa", mainframesController.buscarStatusComponentes);
router.get("/carregarSelect/:fkEmpresa", mainframesController.carregarSelectMainframe);

router.get("/", mainframesController.listarMainframes);

router.get('/qtdAlerta/:arquivo', (req, res) => {
    alertaController.buscarAlertasAgregados(req, res); 
});

router.get("/alertasPorMainframe/:idMainframe", function (req, res) {
    mainframesController.contarAlertasPorMainframe(req, res);
});

// Rota para buscar o Ranking dos Mainframes com mais alertas (Lista Top 5)
router.get("/rankingAlertas/:fkEmpresa", function (req, res) {
    mainframesController.buscarRankingAlertas(req, res);
});

// Rota para buscar KPIs (Total de Mainframes e Com Alerta)
router.get("/statusGeralEKPIs/:fkEmpresa", function (req, res) {
    mainframesController.buscarStatusGeralEKPIs(req, res);
});

// Rota para buscar detalhes de alertas de um Mainframe específico
router.get("/detalheAlertas/:idMainframe", function (req, res) {
    mainframesController.buscarAlertasPorMainframe(req, res);
});

router.get("/empresaPorMac/:mac", function(req, res) {
    mainframesController.obterEmpresaPorMac(req, res);
});

module.exports = router;
