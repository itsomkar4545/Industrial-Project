const express=require('express');
const exphbs=require('express-handlebars');
const hbs=require('handlebars');
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const path=require('path');
const db=require('./config/database');
const flash=require('connect-flash');
const session=require('express-session');
const index=require('./controllers/index');
const user=require('./controllers/userController');
const ad=require('./controllers/adController');
const category=require('./controllers/categoryController');
const port=8080||process.env.port;
const app=express();
app.set('view engine','handlebars');
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'main',
handlebars:allowInsecurePrototypeAccess(hbs)}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
});
app.use('/',index);
app.use('/user',user);
app.use('/ad',ad);
app.use('/category',category);
app.listen(port,()=>{
    console.log('server started on '+port);
});