var express = require('express');
var pg = require('pg');
var client = new pg.Client(connectionString);

client.connect(function (err) {

  if (err) throw err;


  client.query("CREATE TABLE \
                  categories( \
                    id SERIAL PRIMARY KEY, \
                    name VARCHAR(40) not null)");

  client.query("CREATE TABLE \
                  menuitems( \
                    id SERIAL PRIMARY KEY, \
                    name VARCHAR(40) not null, \
                    description VARCHAR(40) not null, \
                    price NUMERIC(6,2) not null, \
                    category_id INTEGER REFERENCES categories(id))");

  client.query("CREATE TABLE \
                  orders( \
                    id SERIAL PRIMARY KEY, \
                    customer VARCHAR(40) not null, \
                    totalprice NUMERIC(6,2) not null, \
                    complete boolean default false)");

  client.query("CREATE TABLE \
                  suborders( \
                    id SERIAL PRIMARY KEY, \
                    description VARCHAR(40) not null, \
                    subtotalprice NUMERIC(6,2) not null, \
                    quantity INTEGER not null, \
                    id_orders INTEGER REFERENCES orders(id), \
                    id_menuitems INTEGER REFERENCES menuitems(id))");

  client.query("INSERT INTO \
                  categories(name) \
                    VALUES('breakfast'), \
                          ('lunch'), \
                          ('dinner'), \
                          ('desert'), \
                          ('drinks')");

client.query("INSERT INTO \
                  menuitems(name, description, price, category_id) \
                    VALUES('Walker Texas Brisket', 'Texas sized burger in walker sauce', 12.99, 3), \
                      ('Roundhouse Kick Burger', 'Roundhouse kick to the gut', 12.99, 3), \
                      ('The Delta Four-Cheese Pizza', 'Baked by Chuck staring at it for 1 min', 14.99, 3), \
                      ('Kickin Grits and Taters', 'Grits and seasoned taters', 9.99, 1), \
                      ('Magnus Stack', 'Large stack of pancakes', 9.99, 1), \
                      ('Hearty Oats and Toast', 'Oatmeal served with toast', 9.99, 1)");

client.query("INSERT INTO \
                  menuitems(name, description, price, category_id) \
                    VALUES('Grilled Cheese Sandwich', 'Tasty grilled cheese sandwich', 7.99, 2), \
                      ('Philly Cheese Sandwich', 'Philly cheese style sandwich', 12.99, 2), \
                      ('Walker Kickin Chicken Salad', 'Grilled chicken salad', 9.99, 2), \
                      ('Bucket O Oreos', 'Oreos with a tall glass of milk', 5.99, 3), \
                      ('Red Bearded Velvet Cake', 'Red Velvelt Cake', 5.99, 3), \
                      ('Mango Spritzer', 'Mango and orange juice in champagne', 7.99, 4)");

});