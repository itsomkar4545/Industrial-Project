const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    port:'3306',
    database:'adposting',
    password:'seed',
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