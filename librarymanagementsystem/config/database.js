const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    database:'libraryms',
    user:'root',
    password:'seed',
    port:'3306',
    multipleStatements:true
});
db.connect((err,result)=>{
    if(!err)
    {
        console.log('database connected');
    }
    else
    {
        console.log('error '+err);
    }
});
module.exports=db;