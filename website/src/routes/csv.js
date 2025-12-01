const express = require("express");
const router = express.Router();
const controller = require("../controllers/csvController");

router.get('/processo/:macAdress',controller.buscarCSV)

module.exports = router;