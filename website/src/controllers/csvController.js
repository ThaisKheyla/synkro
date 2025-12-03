const AWS = require('aws-sdk');
const csv = require('csvtojson');

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

async function buscarCSV(req, res) {
  var macAdress = req.params.macAdress; 
  /** csv file
  a,b,c
  1,2,3
  4,5,6
  */
  const csvFilePath = 'src/database/trusted.csv'
  const csv = require('csvtojson')

  
  csv({ delimiter: ';' })
    .fromFile(csvFilePath)
    .then((jsonObj) => {  
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */
    })
 
  // Async / await usage
  
  const jsonArray = await csv({ delimiter: ';' }).fromFile(csvFilePath);
  // console.log(jsonArray)
   
  const jsonArrayId = jsonArray.filter(item=>item.macAdress==macAdress)
  res.json(jsonArrayId)
}

async function buscarCSVAWS(req,res) {
  { 
  try {
    const fileKey = req.params.arquivo;   // usa o mesmo parâmetro da rota
    const macAdress = req.params.macAdress; 
    if (!/^[\w.\-]+$/.test(fileKey)) {
      return res.status(400).send('❌ Nome de arquivo inválido.');
    }

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey
    };
    
    console.log(`📥 Lendo CSV do S3: ${params.Bucket}/${params.Key}`);

    const data = await s3.getObject(params).promise();
    const text = data.Body.toString('utf-8').trim();

    // converte direto o conteúdo do S3 em JSON
    const jsonArray = await csv({ delimiter: ';' }).fromString(text);

    // filtra pelo macAdress
    const jsonArrayId = jsonArray.filter(item => item.macAdress == macAdress);

    res.json(jsonArrayId);
  } catch (err) {
    console.error('❌ Erro ao buscar CSV do S3:', err.message);
    res.status(500).send('Erro ao buscar CSV: ' + err.message);
  }
}
}
 

module.exports = {
    buscarCSV,
    buscarCSVAWS
}