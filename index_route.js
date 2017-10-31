var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
//     host : 'localhost',
     user : 'root',
     password : '1q2w3e4r',
     database : 'my_db'
   });

var app = express();

// configuration 

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
     res.send('root');
});

app.get('/persons', function(req, res){
    
// connection.query('USE my_db');
 connection.query('SELECT * from Persons', function(error, rows) {
   if(error) throw error;
   
   console.log('The solution is: ', rows);
   res.send(rows);
   });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));

});
//connection.end();
