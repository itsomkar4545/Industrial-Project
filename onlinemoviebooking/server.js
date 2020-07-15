const express=require('express');
const index=require('./controllers/index');
const booking=require('./controllers/bookingsController');
const movie=require('./controllers/movieController');
const genre=require('./controllers/genreContoller');
const timing=require('./controllers/timingsContoller');
const show=require('./controllers/showsController');
const db=require('./config/database');
const exphbs=require('express-handlebars');
const hbs=require('handlebars');
const path=require('path');
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const port=8080||process.env.port;
const app=express();
app.set('view engine','handlebars');
app.set('views',path.join(__dirname,'views'));
app.set('handlebars',exphbs({
    defaultLayout:'main',
    handlebars:allowInsecurePrototypeAccess(hbs)
}));
app.set(express.static(path.join(__dirname,'public')));
app.use('/',index);
app.use('/shows',show);
app.use('/timings',timing);
app.use('/movies',movie);
app.use('/genres',genre);
app.use('/booking',booking);
app.listen(port,()=>{
    console.log('server started on '+port);
});