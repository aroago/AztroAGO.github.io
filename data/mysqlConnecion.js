var mysql = require("mysql");
const fs = require('fs');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
	database: "test"
});

connection.connect((err) => {
	if (err) throw err;
  connection.query("SELECT top 12 * FROM signs ORDER BY id DESC", function (err, result, fields) {
    if (err) throw err;
    const data = JSON.stringify(result);

// write JSON string to a file
	fs.writeFile('signs.js',"var signs="+data+";", (err) => {
    if (err) {
        throw err;
    }   
    console.log("JSON data is saved.");
});
	
  });
});