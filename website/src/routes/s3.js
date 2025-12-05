const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3Controller');

router.get('/arquivo/:arquivo', s3Controller.lerArquivo); 
router.get('/arquivos/:prefix?', s3Controller.listarArquivos); 

module.exports = router;