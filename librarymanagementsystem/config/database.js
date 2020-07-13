const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    database:'libraryms',
    user:'root',
    password:'seed',
    port:'3306',
    multipleStatements:true
});
module.exports=db;