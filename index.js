var mysql = require('mysql');
var connection = mysql.createConnection({
//     host : 'localhost',
     user : 'root',
     password : '1q2w3e4r',
     database : 'my_db'
   });

// connection.connect();

 connection.query('USE my_db');
 connection.query('SELECT * from Persons', function(error, rows, fields) {
   if(!error) 
     console.log('The solution is: ', rows);
   else
     console.log('Error while opearting query.', err);
});

connection.end();
