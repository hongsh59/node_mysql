fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// connect database 
var client = mysql.createConnection({
  user: 'root',
  password: '1q2w3e4r',
  database: 'Company'
});

// make server
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

// execute server
app.listen(52273, function () {
  console.log('server running at http://127.0.0.1:52273');
});

// execute route
app.get('/', function (request, response) {
  // read files
  fs.readFile('list.html', 'utf8', function (error, data) {
    // execute query
    client.query('SELECT * FROM products', function (error, results) {
      // response
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});

app.get('/delete/:id', function (request, response) {
  // execute query
  client.query('DELETE FROM products WHERE id=?', [request.params.id], function () {
    // response
    response.redirect('/');
  });
});

app.get('/insert', function (request, response) {
  // read files
  fs.readFile('9-insert.html', 'utf8', function (error, data) {
    // response
    response.send(data);
  });
});

app.post('/insert', function (request, response) {
  // declare variables
  var body = request.body;
  // execute query
  client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [
      body.name, body.modelnumber, body.series
  ], function () {
    // response
    response.redirect('/');
  });
});

app.get('/edit/:id', function (request, response) {
  // read files
  fs.readFile('edit.html', 'utf8', function (error, data) {
    // execute query
    client.query('SELECT * FROM products WHERE id = ?', [
        request.params.id
    ], function (error, result) {
      // response
      response.send(ejs.render(data, {
        data: result[0]
      }));
    });
  });
});

app.post('/edit/:id', function (request, response) {
  // declare variables
  var body = request.body;
  // execute query
  client.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?', [body.name, body.modelnumber, body.series, request.params.id], function () {
    // response
    response.redirect('/');
  });
});