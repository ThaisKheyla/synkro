const express = require('express');
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get('/dados', dashboardController.buscarDadosDashboard);

module.exports = router;
