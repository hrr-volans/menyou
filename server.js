var express = require('express');
var path = require('path');
var pg = require('pg');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var app = express();



// instantiate a new client 
// the client will read connection information from 
// the same environment variables used by postgres cli tools 
var client = new pg.Client();
 
// connect to our database 
client.connect(function (err) {
  if (err) throw err;
 
  
  // client.query('SELECT $1::text as name', ['brianc'], function (err, result) {
  //   if (err) throw err;
 
    
  //   console.log(result.rows[0]); // outputs: { name: 'brianc' } 
 
    
  //   client.end(function (err) {
  //     if (err) throw err;
  //   });
  // });
});




app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/')));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port');
});