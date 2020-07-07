const mysql=require('mysql');
const db=mysql.createConnection({
    host:'bfahpepwmvxee9chd9zo-mysql.services.clever-cloud.com',
    user:'urlm5xnlpwczte1t',
    database:'bfahpepwmvxee9chd9zo',
    password:'RMw1XfbfPwqtvinTs67c',
    port:3306,
    multistatment:true
});
db.connect((err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
       console.log('database connected');
    }
});
module.exports=db;