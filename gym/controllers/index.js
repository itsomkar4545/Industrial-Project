const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.get('/',(req,res)=>{
    let sql='select classes.id,classes.name,instructors.name as instructor from classes join instructors on instructors.id=classes.instructor';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('index',{instructors:result});
        }
        else
        {
            res.render('index',{error:err});
        }
    });
});
router.get('/class/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select class.name as name ,instructors.picture as image,instructors.speciality as type,instructors.name as instructor from classes join instructors on instructors.id=classes.id where classes.id=? ';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.render('class',{class:result,layout:'secondary'});
        }
        else
        {
           res.render('class',{error:err,layout:'secondary'});
        }
    });
});
router.get('/classes',(req,res)=>{
    let sql='select * from classes';
    db.query(sql,(err,result)=>{
        if(!err)
        {
           let sql1='select * from instructors';
           db.query(sql1,(error,result1)=>{
               if(!error)
               {
                res.render('classes',{equipments:result,instructors:result1});
               }
               else
               {
                res.render('classes',{error:error});
               }
           });
        }
        else
        {
             res.render('classes',{error:err});
        }
    });
});
router.get('/equipments',(req,res)=>{
    let sql='select * from equipments';
    db.query(sql,(err,result)=>{
        if(!err)
        {
           res.render('equipments',{equipments:result});
        }
        else
        {
           res.render('equipments',{error:err});
        }
    });
});
router.get('/instructors',(req,res)=>{
    let sql='select * from instructors';
    db.query(sql,(err,result)=>{
        if(!err)
        {
             res.render('instructors',{instructors:result});
        }
        else
        {
             res.render('instructors',{error:err});
        }
    });
});
router.get('/member',(req,res)=>{
    let sql='select * from members';
    db.query(sql,(err,result)=>{
        if(!err)
        {
           res.render('member',{members:result});
        }
        else
        {
           res.render('member',{error:err});
        }
    });
});
module.exports=router;