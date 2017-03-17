var express = require('express');
var path = require('path');
var pg = require('pg');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var routes = require('./routes');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/menyoudb';

var routes = require('./routes');

var app = express();

var client = new pg.Client(connectionString);

client.connect(function (err) {
  if (err) throw err;

  // client.query("CREATE TABLE categories(id SERIAL PRIMARY KEY, name VARCHAR(40) not null)"); 
  // client.query("CREATE TABLE menuitems(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, description VARCHAR(40) not null, price INTEGER not null, category_id INTEGER REFERENCES categories(id))")         
  // client.query("CREATE TABLE orders(id SERIAL PRIMARY KEY, customer VARCHAR(40) not null, totalPrice INTEGER not null)"); 
  // client.query("CREATE TABLE suborders(id SERIAL PRIMARY KEY, subtotalprice INTEGER not null, quantity INTEGER not null, totalPrice INTEGER not null, id_orders INTEGER REFERENCES orders(id), id_menuitems INTEGER REFERENCES menuitems(id))");

  // client.query("INSERT INTO categories(name) VALUES('burgers'), ('dinner'), ('breakfast'), ('drinks')");                  
  // client.query("INSERT INTO menuitems(name, description, price, category_id) VALUES('bigmac', 'the biggest burger', 122, 1), ('nuggets', 'little nuggets', 232, 3), ('fries', 'good fries', 23, 2)");                  
});

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/client')));

app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port ' + this.address().port);
});

app.get('/', function(req, res, next) {  
  res.sendfile('index.html');                  
});

app.get('/categories', function(req, res, next) {  
  client.query("SELECT * FROM categories", function(err, result) {   
    res.send(result.rows);
  });                  
});

app.get('/menuitems', function(req, res, next) {
  client.query("SELECT * FROM menuitems", function(err, result) {   
    res.send(result.rows);
  });                  
});

app.get('/orders', function(req, res, next) {
  client.query("SELECT * FROM orders", function(err, result) {   
    res.send(result);
  });    
});

app.post('/orders', function(req, res, next) {
  console.log('order post request');
  console.log(typeof(req.body.customer), typeof(req.body.totalprice));

  client.query("INSERT INTO orders(customer, totalprice) VALUES($1, $2)", [req.body.customer, req.body.totalprice], function(err, result) {   
    console.log(err);
  });  
});

