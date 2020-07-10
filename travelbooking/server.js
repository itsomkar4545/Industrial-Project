const express=require('express');
const db=require('./config/database');
const index=require('./controllers/index');
const path=require('path');
const hbs=require('handlebars');
const exphbs=require('express-handlebars');
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const port=8080||process.env.PORT;
const app=express();
app.set('view engine','handlebars');
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'main',
handlebars:allowInsecurePrototypeAccess(hbs)}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',index);
app.listen(port,()=>{
    console.log(`server started on ${port}`);
});