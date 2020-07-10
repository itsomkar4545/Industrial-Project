const mysql=require('mysql');
const db=mysql.createConnection({
    database:'travelweb',
    user:'root',
    password:'seed',
    host:'localhost',
    port:'3306',
    multipleStatements:true
});
db.connect((err,result)=>{
    if(!err)
    {
        console.log('Database connected')
    }
    else
    {
        console.log(`error occured ${err}`);
    }
});
module.exports=db;