var express = require('express');
var path = require('path');
var pg = require('pg');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
exports.nodemailer = nodemailer;
var validator = require('validator');

var jwt = require('jsonwebtoken');
var secret = 'menyourocks';
var url = require('url');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/menyoudb';

var app = express();

var client = new pg.Client(connectionString);

client.connect(function (err) {
  if (err) throw err;
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

app.get('/kitchen', function(req, res, next) {
  res.redirect('/#/kitchen');
});

app.get('/admin', function(req, res, next) {
  res.redirect('/#/admin');
});

app.get('/confirmation', function(req, res, next) {
  res.redirect('/#/confirmation');
});

app.get('/login', function(req, res, next) {
  res.redirect('/#/login');
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
    res.send(result.rows);
  });
});

app.post('/valid', function(req, res, next) {
  var email = req.body.email;
  res.send(validator.isEmail(email));
});

app.post('/email', function(req, res, next) {
    var orderid = req.body.orderid;
    var add = req.body.email;
    var name = req.body.name;
    if(name.length) {
      client.query(`UPDATE orders SET customer = ($1) WHERE id = ($2)`, [name, orderid],
        function(err, result) {
          if(err) {console.log("ERROR! ", err) }            
            res.send("Name updated");
        }
      );
    }
    console.log(add + ' ' + typeof add)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'volansmenyou@gmail.com',
        pass: 'Verizon7'
      }
    });

    let mailOptions = {
      from: '"MenYou" <foo@blurdybloop.com>', // sender address
      to: add, // list of receivers
      subject: "Hey " + name + "! Here's your first coupon! ✔", // Subject line
      text: 'Whatever we want to tell the client', // plain text body
      html: '<b>Enjoy your savings!</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    });
});

app.get('/userorders', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;  
  var ids = JSON.parse(query.orders_ids);
  var userOrders = [];

  ids.forEach(function(id) {
    client.query("SELECT * FROM orders WHERE id = ($1)", [id], function(err, result) {
      userOrders.push(result.rows[0]);
      if(userOrders.length === ids.length) {
        res.send(userOrders);
      }
    });
  });
});

app.get('/deeporders', function(req, res, next) {
  var deeporder = [];
  client.query("SELECT * FROM orders", function(err, result) {
    var orders = result.rows;
    orders.forEach(function(order, ind, coll){
      client.query("SELECT * FROM suborders WHERE id_orders = ($1)", [order.id], function(err, result){
        if(err) { console.log(err) }
        order.menuitems = result.rows;
        deeporder.push(order);
        if(deeporder.length === coll.length) {           
           res.send(deeporder);
        };
      });
    });
  });
});

app.get('/getMax', function(req, response, next) {
  client.query("SELECT * FROM orders WHERE id = (SELECT MAX(id) FROM orders)", function(err, res) {    
    var data = [];
    if (res.rows[0] === undefined) {
      response.status(204);
      response.send();
    } else {
      var maxId = res.rows[0].id;
      data.push(res.rows[0].id);
      data.push(res.rows[0].customer);
      data.push(res.rows[0].totalprice);
      client.query("SELECT * FROM suborders WHERE id_orders = ($1)",[maxId], function(err, res) {
        data.push(res.rows);
        response.send(data);
      });      
    }
  });
});

app.get('/kitchenorders', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var lastIdFromClient = query.last_id;
  var deeporder = [];
  var lastOrderId;

  // This combination of queries are created to only grab the new orders
  // that might be stored in the DB. Kitchen client will check every 5 seconds 
  client.query("SELECT * FROM orders ORDER BY id DESC LIMIT 1", function(err, lastRecord) {
    // First we pick the id from the last order stored in the DB
    lastOrderId = lastRecord.rows[0].id;
    // compare it with the id sent through params from the client
    if (lastIdFromClient < lastOrderId) {
      var offset = lastOrderId - lastIdFromClient;
      // Only query the amount of records that are offset in descending order
      // a.k.a. new orders in the DB.
      client.query("SELECT * FROM orders ORDER BY id DESC LIMIT ($1)", [offset], function(err, offsetRecords) {
        if(err) {console.log(err)};
        var orders = offsetRecords.rows;
        // use the id of each order to look in the suborders table
        // using their foreign key
        orders.forEach(function(order, index, array){
          client.query("SELECT * FROM suborders WHERE id_orders = ($1)", [order.id], function(err, subOrders){
            if(err) { console.log(err) }
            order.menuitems = subOrders.rows;
            // builds the response object that the client expects.
            deeporder.push(order);
            if(deeporder.length === offset) {
              res.send(deeporder);
            };
          });
        });
      });
    } else {
      // if no new records are found
      res.status(204);
      res.send();
    }
  })
});

//var orderCount = 0;
app.post('/orders', function(req, res, next) {  
  var menuitems = req.body.menuitems;

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
                    [suborder.name, suborder.price, suborder.quantity, result.rows[0].id, suborder.category_id],
                    function(err, menuResults) {
                    if(err) {
                      console.log(err);
                    }
      });
    });
    res.send(result.rows[0]);
  });
});

app.post('/complete', function(req, res, next) {
  client.query("UPDATE orders SET complete = true WHERE id = ($1)", [req.body.id],
    function(err, result) {
      if(err) {console.log("ERROR! ", err) }        
      res.send("Order complete");
    }
  );
});

app.post('/incomplete', function(req, res, next) {
  client.query("UPDATE orders SET complete = false WHERE id = ($1)", [req.body.id],
    function(err, result) {
      if(err) {console.log("ERROR! ", err) }
        
      res.send("Order re-added");
    }
  );
});


app.post('/createCategory', function(req, res, next) {  
  var newCat = req.body.name;  
  client.query("INSERT INTO \
                  categories(name) VALUES($1) RETURNING name",[newCat],
                    function(err, results) {
                      if(err) { res.send("POST FAILED") }                      
                      res.send(results.rows);
                    });
});

app.post('/createMenuItem', function(req, res, next) {  
  var newItem = req.body;  
  client.query("INSERT INTO \
                  menuitems(name, description, price, category_id) \
                  VALUES ($1, $2, $3, $4) RETURNING name", [newItem.name, newItem.description, newItem.price, newItem.category_id],
                  function(err, results) {
                    if(err) { res.send("POST FAILED") }                    
                    
                    res.send(results.rows);
                  });

});

app.post('/authenticate', function(req, res, next) {
  var body = req.body;
  var user = {};
  if(req.body.token) {
    jwt.verify(req.body.token, secret, function(err, decoded){
      if(err) {
        res.status(401).send('Invalid credentials');
      } else {
        res.send(decoded);
      }
    });
  } else if (body.username === 'admin' && body.password === 'admin') {
    user.type = 'admin';
    res.send({user: user, token: jwt.sign(user, secret)});
  } else if (body.username === 'kitchen' && body.password === 'kitchen') {
    user.type = 'kitchen';
    res.send({user: user, token: jwt.sign(user, secret)});
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/getCurrentData', function(req, res, next) {
  var initialCategory;
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var current_time = query.current_time;

  // this takes care of sending the intial data
  // accorgind to your local time time
  var initialCategory;
  if(current_time < 12) {
    initialCategory = 'Breakfast';
  } else if (current_time < 16) {
    initialCategory = 'Lunch';
  } else if (current_time < 24) {
    initialCategory = 'Dinner';
  } else {
    initialCategory = 'Lunch';
  }

  client.query('SELECT * FROM categories WHERE name = ($1)', [initialCategory], function(err, currentCategory) {
    if(err) {console.log(err)}      
    var categoryId = currentCategory.rows[0].id;

    client.query('SELECT * FROM menuitems WHERE category_id = ($1)', [categoryId], function(err, currentMenuItems) {
      if(err) {console.log(err)}        
      res.send({
        menuItems: currentMenuItems.rows,
        categoryName: {name: initialCategory, id: categoryId}
      });
    })
  })
});

app.get('/menuByCategory', function(req, res, next) {
  var menuByCategory = {};
  client.query('SELECT * FROM categories', function(err, categories) {    
    categories.rows.forEach(function(category, index) {
      client.query('SELECT * FROM menuitems WHERE category_id = ($1)', [category.id], function(err, menuitems) {        
        menuByCategory[category.name] = menuitems.rows;        

        if(index === categories.rows.length - 1) {          
          res.send(menuByCategory);
        }
      });
    })

  })
});

app.get('/*', function(req, res, next) {
  res.redirect('/');
});



