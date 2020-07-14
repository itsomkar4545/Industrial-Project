const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    port:'3306',
    database:'jobforum',
    password:'seed',
    multipleStatements:true
});
db.connect(err=>{
    if(!err)
    {
        console.log('Database connected');
    }
    else
    {
        console.log('Error occured '+err);
    }
});
module.exports=db;