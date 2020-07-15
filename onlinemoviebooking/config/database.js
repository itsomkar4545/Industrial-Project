const mysql=require('mysql');
const db=mysql.createConnection({
    database:'movietime',
    host:'localhost',
    port:'3306',
    user:'root',
    password:'seed',
    multipleStatements:true
});
db.connect((err,result)=>{
    if(!err)
    {
        console.log('databse connected');
    }
    else
    {
        console.log('error '+err);
    }
});
module.exports=db;