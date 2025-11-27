const express = require('express');
const router = express.Router();
const path = require('path');

const s3Controller = require('../script/s3');

router.get('/dados/:arquivo', (req, res) => {
  s3Controller.lerArquivo(req, res);
});

router.get('/ver/:arquivo', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

module.exports = router;
