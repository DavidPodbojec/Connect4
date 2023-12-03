const express = require('express');
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const getMatrixSum = require('./utils/bot.js');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())

app.post('/api', (req, res) => {
  
  const matrix = req.body.matrix;
  
  getMatrixSum(matrix)
  .then((result) => {
    res.json({board: result});
  })
  .catch((error) => {
    res.json({error: "error"});
  });



  
}) 

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);

})
