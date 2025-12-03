const s3Controller = require('../script/s3'); 

async function buscarAlertasAgregados(req, res) {
    // 1. Reutiliza a função genérica de leitura do S3
    return s3Controller.lerArquivo(req, res);
}

module.exports = {
    buscarAlertasAgregados
};