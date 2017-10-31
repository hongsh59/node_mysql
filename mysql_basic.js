var mysql = require('mysql');

var client = mysql.createConnection({
  user :'root',
  password: '1q2w3e4r'
 });

 client.query('USE Company');
 client.query('SELECT * FROM products', function(error, result, fields) {
  if(error) {
   console.log('Error happened');
   } else {
   console.log(result);
  }
});
