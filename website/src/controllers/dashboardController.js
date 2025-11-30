const fs = require('fs');
const path = require('path');

const JSON_FILE_PATH = path.join(__dirname, '..', 'database', 'dashboard_data.json');

function buscarDadosDashboard(req, res) {
    console.log("Buscando dados do dashboard...");
    
    try {
        const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
        const jsonData = JSON.parse(data);
        
        console.log(`Dados encontrados: ${jsonData.length} registros.`);
        res.status(200).json(jsonData);
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Erro: Arquivo JSON não encontrado em ${JSON_FILE_PATH}`);
            res.status(404).json({ erro: "Arquivo de dados do dashboard não encontrado." });
        } else {
            console.error("Erro ao ler ou parsear o JSON:", error.message);
            res.status(500).json({ erro: "Erro interno ao processar os dados." });
        }
    }
}

module.exports = {
    buscarDadosDashboard
};
