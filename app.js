const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/test.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/test.html'));
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})