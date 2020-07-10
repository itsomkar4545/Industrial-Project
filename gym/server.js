const express=require('express');
const index=require('./controllers/index');
const member=require('./controllers/memberController');
const instructor=require('./controllers/instructorController');
const equipment=require('./controllers/equipmentController');
const classes=require('./controllers/classesController')
const db=require('./config/database');
const session=require('express-session');
const path=require('path');
const hbs=require('handlebars');
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const exphbs=require('express-handlebars');
const flash=require('connect-flash');
const { resolve } = require('path');
const port=8080||process.env.PORT;
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
app.use('/member',member);
app.use('/instructor',instructor);
app.use('/equipment',equipment);
app.use('/classes',classes);
app.listen(port,()=>{
    console.log(`server started on ${port}`);
});