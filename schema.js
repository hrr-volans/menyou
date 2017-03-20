// var pg = require('pg');

// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/menyoudb';
// var client = new pg.Client(connectionString);
 
// client.connect(function (err) {
//   if (err) throw err;

//   client.query("CREATE TABLE 
//   					orders(id SERIAL PRIMARY KEY, \
//   						customer VARCHAR(40) not null, \
//   						totalPrice INTEGER not null)"); 

//   client.query("CREATE TABLE 
//   					categories(id SERIAL PRIMARY KEY, \
//   						name VARCHAR(40) not null"); 

//   client.query("CREATE TABLE 
//   					menuItems(id SERIAL PRIMARY KEY, \
//   						name VARCHAR(40) not null, \  						
//   						description VARCHAR(40) not null, \
//   						price INTEGER not null, \
//   						category_id INTEGER not null REFERENCES categories(id)");

//   client.query("CREATE TABLE 
//   					subOrders(id SERIAL PRIMARY KEY, \
//   						subTotalPrice INTEGER not null, \
//   						quantity INTEGER not null, \  						
//   						totalPrice INTEGER not null), \
//   						order_id INTEGER not null REFERENCES order(id), \
//   						menuItems_id INTEGER not null REFERENCES menuItems(id)"); 	  						 	

				
     
// });