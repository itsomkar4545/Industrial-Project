const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.get('/',(req,res)=>{
    let sql='select hotels.id,hotels.name,hotels.cost,location.name as location ,type.name as type from hotels join type on hotels.type=type.id join location on hotel.location =location.id';
    db.query(sql,(result,err)=>{
        if(!err)
        {
          let sql2='select * from packages';
          db.query(sql2,(err,result1)=>{
              if(!err)
              {
                res.render('index',{hotels:result,holidays:result1});
              }
              else
              {
                  res.render('index',{error:err});
              }
          });
        }
        else
        {
             res.render('index',{error:err});
        }
    });
});
router.get('/hotel/:id',(req,res)=>{
    let {id}=req.params;
    let sql='select hotels.name,hotels.cost,type.name,location.name from hotels join types on hotels.type=types.id join locations on hotel.location=locations.id where id =?';
    let body=[id];
    db.query(sql,(err,body,result)=>{
        if(!err)
        {
            res.render('hotels',{hotel:result});
        }
        else
        {
            res.render('hotels',{error:err});
        }
    });
});
router.get('/holiday/:id',(req,res)=>{
    let {id}=req.params;
    let sql='select * from packages where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.render('holidays',{holiday:result});
        }
        else
        {
            res.render('holidays',{error:err});
        }
    });
});
router.get('/admin',(req,res)=>{
    let sql='select * from bookings';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('admin',{bookings:result,layout:'admin'});
        }
        else
        {
             res.render('admin',{error:err,layout:'admin'});
        }
    });
});
router.get('/hotels',(req,res)=>{
    let sql='select * from hotels';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('hotelmanage',{hotels:result,layout:'admin'});
        }
        else
        {
            res.render('hotelmanage',{error:err,layout:'admin'});
        }
    });
});
router.get('/holidays',(req,res)=>{
    let sql='select * from packages';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('holidaymanage',{holdays:result,layout:'admin'});
        }
        else
        {
            res.render('holidaymanage',{error:err,layout:'admin'});
        }
    });
});
router.get('/type',(req,res)=>{
    let sql='select * from types';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('typemanage',{types:result,layout:'admin'});
        }
        else
        {
            res.render('typemanage',{error:err,layout:'admin'});
        }
    });
});
router.get('/location',(req,res)=>{
    let sql='select * from locations';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('locationmamage',{locations:result,layout:'admin'});
        }
        else
        {
            res.render('locationmanange',{error:err,layout:'admin'});
        }
    });
});
module.exports=router;