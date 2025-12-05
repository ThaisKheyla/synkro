const AWS = require('aws-sdk');

// Configure credenciais AWS (use variáveis de ambiente)
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

async function buscarDadosDashboard(req, res) {
    console.log("🔍 Buscando dados do dashboard no S3...");

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: 'dashboard/dashboard_data.json'
    };
    console.log("S3 params:", { Bucket: params.Bucket, Key: params.Key, Region: process.env.AWS_REGION });

    try {
        const data = await s3.getObject(params).promise();

        if (!data || !data.Body) {
            console.error("S3 retornou objeto vazio.");
            return res.status(500).json({ erro: "Objeto S3 vazio." });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data.Body.toString('utf-8'));
        } catch (parseErr) {
            console.error("Erro ao parsear JSON do S3:", parseErr);
            return res.status(500).json({ erro: "JSON inválido no S3.", detalhes: parseErr.message });
        }

        console.log(" Dados carregados do S3. Keys:", Object.keys(jsonData));
        return res.status(200).json(jsonData);

    } catch (error) {
        console.error(" Erro ao buscar S3:", error && (error.stack || error.message || error));
        const code = error && error.code ? error.code : 'UnknownError';
        const statusMap = { NoSuchKey: 404, NoSuchBucket: 404, AccessDenied: 403 };
        const status = statusMap[code] || 500;
        return res.status(status).json({ erro: "Erro ao buscar dados do S3.", code, mensagem: error.message });
    }
}

module.exports = { buscarDadosDashboard };
