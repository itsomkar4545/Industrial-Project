const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    port:'3306',
    database:'adposting',
    user:'root',
    password:'root',
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