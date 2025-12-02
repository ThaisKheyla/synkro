const express = require("express");
const router = express.Router();
const controller = require("../controllers/csvController");

router.get('/processo/:macAdress',controller.buscarCSV)
router.get('/dadoscsv/:arquivo/:macAdress',controller.buscarCSVAWS)


module.exports = router;