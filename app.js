const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
require('dotenv').config();


var app = express();
const port = 3000;

app.use(express.json());




app.get('/seats', (req, res) => {
  const sentToken = req.body.TOKEN;
  const veriToken = process.env.TOKEN;
  if( sentToken === veriToken) {
    var data = JSON.parse(fs.readFileSync('seats.json').toString());
    res.status(200).send(data);
  }
  else {
    res.status(401).send('FORBIDDEN');
  }
  
});

app.put('/seat', (req, res) => {
  var data = JSON.parse(fs.readFileSync('seats.json').toString());
  const seat = req.body.seat;
  const newUser = req.body.user;
  const sentToken = req.body.TOKEN;
  const veriToken = process.env.TOKEN;
  const index = data.findIndex(function (item, i) {
    return item.name === seat
  });
  if (data[index] != undefined && sentToken === veriToken) {
    data[index].currentUser = newUser;
    fs.writeFileSync('seats.json', JSON.stringify(data), 'utf-8');
    res.status(200).send(data);
  }
  else {
    res.status(400).send("Bad Request");
  }
});

app.get('/', (req, res) => {
  res.send('Main Page');
});

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});