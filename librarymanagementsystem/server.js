const express=require('express');
const db=require('./config/database');
const index=require('./controllers/index');
const book=require('./controllers/bookController');
const issue=require('./controllers/issueController');
const user=require('./controllers/userController');
const exphbs=require('express-handlebars');
const hbs=require('handlebars');
const path=require('path');
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const port=8080||process.env.port;
const app=express();
app.set('view engine','handlebars');
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'main',
handlebars:allowInsecurePrototypeAccess(hbs)}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use('/',index);
app.use('/book',book);
app.use('/issue',issue);
app.use('/user',user);
app.listen(port,()=>{
    console.log('server started on '+port);
});