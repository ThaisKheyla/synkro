require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const params = { Bucket: process.env.AWS_S3_BUCKET || process.env.S3_BUCKET, Key: 'dashboard/dashboard_data.json' };

(async () => {
  try {
    const data = await s3.getObject(params).promise();
    console.log("OK: objeto obtido. Tamanho:", data.Body.length);
    const json = JSON.parse(data.Body.toString('utf8'));
    console.log("JSON OK. Keys:", Object.keys(json));
  } catch (err) {
    console.error("Erro test_s3:", err && (err.stack || err.message || err));
  }
})();