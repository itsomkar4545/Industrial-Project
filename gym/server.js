const express=require('express');
const index=require('./controllers/index');
const port=8080||process.env.PORT;
const app=express();
app.use('/',index);
app.listen(port,()=>{
    console.log(`server started on ${port}`);
});