const mysql = require("mysql");
const dotenv=require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sonu12",
    database: "company"
  });
  
  connection.connect((error) => {
    if (error) throw error;
  
    console.log("Database is connected");
  });

  module.exports=connection