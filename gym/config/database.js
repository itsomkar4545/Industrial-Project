const mysql=require('mysql');
const db=mysql.createConnection({
    user:'root',
    password:'seed',
    database:'gymms',
    host:'localhost',
    port:'3306',
    multipleStatements:true
});
db.connect((err)=>{
    if(err)
    {
      console.log('database connected');
    }
    else
    {
       console.log('error'+err);
    }
});