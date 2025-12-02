const AWS = require('aws-sdk');

// Configure credenciais AWS (use variáveis de ambiente)
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

async function buscarDadosDashboard(req, res) {
    console.log("Buscando dados do dashboard no S3...");
    
    try {
        // parâmetros: ajuste bucket e key conforme sua estrutura
        const params = {
            Bucket: process.env.AWS_S3_BUCKET || 'seu-bucket-synkro',
            Key: 'dashboard/dashboard_data.json'  // caminho no S3
        };
        
        const data = await s3.getObject(params).promise();
        const jsonData = JSON.parse(data.Body.toString('utf-8'));
        
        console.log(`Dados encontrados: ${jsonData.length || Object.keys(jsonData).length} registros.`);
        res.status(200).json(jsonData);
        
    } catch (error) {
        console.error("Erro ao buscar dados do S3:", error.message);
        
        if (error.code === 'NoSuchKey') {
            res.status(404).json({ erro: "Arquivo de dados não encontrado no S3." });
        } else if (error.code === 'NoSuchBucket') {
            res.status(404).json({ erro: "Bucket S3 não encontrado." });
        } else {
            res.status(500).json({ erro: "Erro ao processar dados do S3.", detalhes: error.message });
        }
    }
}

module.exports = {
    buscarDadosDashboard
};
