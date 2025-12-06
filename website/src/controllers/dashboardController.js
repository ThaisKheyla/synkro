require('dotenv').config(); // garante env vars carregadas
const AWS = require('aws-sdk');

const BUCKET = process.env.AWS_S3_BUCKET;
if (!BUCKET) {
    console.error(" ERRO: AWS_S3_BUCKET não está definido no .env");
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

async function buscarDadosDashboard(req, res) {
    console.log("🔍 Buscando dados do dashboard no S3...");
    console.log("ENV vars set:", {
        Bucket: BUCKET ? '✓' : '✗',
        AccessKey: process.env.AWS_ACCESS_KEY_ID ? '✓' : '✗',
        Region: process.env.AWS_REGION || 'default'
    });

    if (!BUCKET) {
        return res.status(500).json({ erro: "AWS_S3_BUCKET não está definido no .env" });
    }

    const params = {
        Bucket: BUCKET,
        Key: 'dashboard/dashboard_data.json'
    };
    console.log("S3 params:", { Bucket: params.Bucket, Key: params.Key });

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
        return res.status(status).json({ 
            erro: "Erro ao buscar dados do S3.", 
            code, 
            mensagem: error.message,
            bucket: BUCKET
        });
    }
}

module.exports = { buscarDadosDashboard };
