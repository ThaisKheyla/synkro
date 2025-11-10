const express = require("express");
const router = express.Router();
const controller = require("../controllers/csvController");

router.get('/processo',controller.buscarCSV)

module.exports = router;