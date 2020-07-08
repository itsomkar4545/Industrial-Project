const mysql=require('mysql');
const db=mysql.createConnection({
    user:'root',
    password:'seed',
    host:'localhost',
    port:'3306',
    database:'bill',
    multipleStatements:true
});
db.connect((err)=>{
    if(!err)
    {
      console.log('database connected');
    }
    else
    {
      console.log('error occured');
    }
});
module.exports=db;