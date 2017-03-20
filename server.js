var express = require('express');
var path = require('path');
var pg = require('pg');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var routes = require('./routes');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mydb';

var routes = require('./routes');

var app = express();

// var client = new pg.Client(connectionString);

// client.connect(function (err) {
//   if (err) throw err;

  // client.query("CREATE TABLE \
  //                 categories( \
  //                   id SERIAL PRIMARY KEY, \
  //                   name VARCHAR(40) not null)");

  // client.query("CREATE TABLE \
  //                 menuitems( \
  //                   id SERIAL PRIMARY KEY, \
  //                   name VARCHAR(40) not null, \
  //                   description VARCHAR(40) not null, \
  //                   price INTEGER not null, \
  //                   category_id INTEGER REFERENCES categories(id))");

  // client.query("CREATE TABLE \
  //                 orders( \
  //                   id SERIAL PRIMARY KEY, \
  //                   customer VARCHAR(40) not null, \
  //                   totalprice INTEGER not null)");

  // client.query("CREATE TABLE \
  //                 suborders( \
  //                   id SERIAL PRIMARY KEY, \
  //                   description VARCHAR(40) not null, \
  //                   subtotalprice INTEGER not null, \
  //                   quantity INTEGER not null, \
  //                   id_orders INTEGER REFERENCES orders(id), \
  //                   id_menuitems INTEGER REFERENCES menuitems(id))");

  // client.query("INSERT INTO \
  //                 categories(name) \
  //                   VALUES('breakfast'), \
  //                         ('lunch'), \
  //                         ('dinner'), \
  //                         ('desert'), \
  //                         ('drinks')");                  

  // client.query("INSERT INTO \
  //                 menuitems(name, description, price, category_id) \
  //                   VALUES \
  //                     ('Walker Texas Brisket', 'Lone Star state sized burger smothered in walker sauce', 12, 3), \
  //                     ('Roundhouse Kick Burger', 'The way to a mans heart is a roundhouse kick to his gut', 12, 3), \
  //                     ('The Delta Four', 'Cheese Pizza', 14, 3), \
  //                     ('Kickin Grits and Taters', 'Healthy serving of grits and seasoned taters', 9, 1), \
  //                     ('Magnus Stack', 'Large stack of your choice of waffles or pancakes', 9, 1), \                      
  //                     ('Hearty Oats and Toast', 'Oatmean served with toast', 9, 1), \
  //                     ('Grilled Cheese Sandwich', 'Tasty grilled cheese with your choice of cheese', 7, 2), \
  //                     ('Philly Cheese Sandwich', 'Philly cheese style sandwich', 12, 2), \
  //                     ('Walker Kickin Chicken Salad', 'Grilled chicken salad served with walker dressing', 9, 2), \
  //                     ('Bucket O Oreos', 'Your favorite cookies served with a tall glass of milk', 5, 3), \
  //                     ('Red Bearded Velvet Cake', 'Red Velvelt Cake', 5, 3), \                 
  //                                      


  //");                  


// });


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
  var testdata = [
    {
      "id": 1,
      "name": "burgers"
    },
    {
      "id": 2,
      "name": "dinner"
    },
    {
      "id": 3,
      "name": "breakfast"
    },
    {
      "id": 4,
      "name": "drinks"
    }
  ]
  // client.query("SELECT * FROM categories", function(err, result) {
    res.send(testdata);
  // });
});

app.get('/menuitems', function(req, res, next) {
  var data = [
    {
      "id": 1,
      "name": "bigmac",
      "description": "the biggest burgerrrr",
      "price": 122,
      "category_id": 1
    },
    {
      "id": 2,
      "name": "nuggets",
      "description": "little nuggets",
      "price": 232,
      "category_id": 3
    },
    {
      "id": 3,
      "name": "fries",
      "description": "good fries",
      "price": 23,
      "category_id": 2
    }
  ];
  // client.query("SELECT * FROM menuitems", function(err, result) {
    res.send(data);
  // });
});

app.get('/orders', function(req, res, next) {
  client.query("SELECT * FROM orders", function(err, result) {
    res.send(result);
  });
});

app.post('/orders', function(req, res, next) {
  console.log('order post request');

  var menuitems = req.body.menuitems;

  client.query('SQL', [a, s, c], function(err, res){
    client.query('INSERT into aksk values ()', [], function(err, res){

    })
  })

  client.query("INSERT INTO \
                  orders(customer, totalprice) VALUES($1, $2) RETURNING id", [req.body.customer, req.body.totalprice],
                  function(err, result) {
    if(err) {
      console.log(err);
      res.send('FAIL POST');
    }

    menuitems.forEach(function(suborder) {
      client.query("INSERT INTO \
                    suborders(description, subtotalprice, quantity, id_orders, id_menuitems) VALUES($1, $2, $3, $4, $5)",
                    [suborder.name, suborder.subtotalprice, suborder.quantity, result.rows[0].id, suborder.category_id],
                    function(err, result) {
                    console.log(err);
      });
    });
  });
});


app.post('/createCategory', function(req, res, next) {
  //access the database....
    //add a new category to table categories 
  var newCat = req.body.name;
  console.log(newCat);
  client.query("INSERT INTO \
                  categories(name) VALUES($1)",[newCat], 
                    function(err, results) {
                      if(err) { res.send("POST FAILED") }
                    });
});

app.post('/createMenuItem', function(req, res, next) {
  //add a new menue item to the database table, 'menueites' 
    //each item needs  (name, description, price, category_id)
  var newItem = req.body;
  console.log(newItem);
  client.query("INSERT INTO \
                  menuitems(name, description, price, category_id) \
                  VALUES ($1, $2, $3, $4)", [newItem.name, newItem.description, newItem.price, newItem.category_id], 
                  function(err, results) { 
                    if(err) { res.send("POST FAILED") }
                  });
});