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

 

module.exports = {
    buscarCSV
}