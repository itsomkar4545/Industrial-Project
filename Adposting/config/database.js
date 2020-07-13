const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    port:'3306',
    database:'adposting',
    password:'seed',
    multipleStatements:true
});
module.exports=db;