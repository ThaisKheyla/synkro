require('dotenv').config();
const AWS = require('aws-sdk');
const Papa = require('papaparse');

const BUCKET = process.env.AWS_S3_BUCKET || process.env.S3_BUCKET;
if (!BUCKET) console.warn(' AWS S3 bucket not set in AWS_S3_BUCKET or S3_BUCKET env var.');

AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();

function validateKey(key) {
  return typeof key === 'string' && !key.includes('..') && /^[\w\-./]+$/.test(key);
}

async function lerArquivo(req, res) {
  try {
    const fileKey = decodeURIComponent(req.params.arquivo || req.query.key || '').trim();
    if (!fileKey || !validateKey(fileKey)) {
      return res.status(400).json({ erro: 'Nome de arquivo inválido.' });
    }

    const params = { Bucket: BUCKET, Key: fileKey };
    console.log(` Lendo do S3: ${params.Bucket}/${params.Key}`);

    const data = await s3.getObject(params).promise();
    const text = data.Body.toString('utf-8').trim();

    let content;
    if (text.startsWith('[') || text.startsWith('{')) {
      content = JSON.parse(text);
    } else {
      const parsed = Papa.parse(text, {
        header: true,
        delimiter: text.includes(';') ? ';' : ',',
        skipEmptyLines: true
      });
      content = parsed.data;
    }

    return res.json(content);
  } catch (err) {
    console.error(' Erro ao buscar arquivo S3:', err && (err.stack || err.message || err));
    const code = err && err.code ? err.code : 'UnknownError';
    const status = (code === 'NoSuchKey' || code === 'NoSuchBucket') ? 404 : 500;
    return res.status(status).json({ erro: err.message, code });
  }
}

async function listarArquivos(req, res) {
  try {
    const prefix = req.query.prefix || req.params.prefix || '';
    const params = { Bucket: BUCKET, Prefix: prefix };
    console.log(` Listando S3: ${params.Bucket} prefix='${params.Prefix}'`);

    const data = await s3.listObjectsV2(params).promise();
    const arquivos = (data.Contents || []).map(obj => obj.Key);
    return res.json(arquivos);
  } catch (err) {
    console.error(' ERRO AO LISTAR ARQUIVOS:', err && (err.stack || err.message || err));
    return res.status(500).json({ erro: err.message });
  }
}

module.exports = { lerArquivo, listarArquivos };