const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { route } = require('.');
router.post('/add',(req,res)=>{
    const {name,instructor}=req.body;
    let sql='insert into classes set ?';
    let body={name:name,instructor:instructor};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','class created');
            res.redirect('/classes');
        }
        else
        {
              req.flash('error',err);
              res.redirect('/classes');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql ='select * from classes where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                class:result[0]
            });
        }
        else
        {
           res.status(401).json({
               msg:'error occured',
               error:err
           });
        }
    });
});
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    let sql='update classes set name =? where id=?';
    let body=[name,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','class updated');
            res.redirect('/classes');
        }
        else
        {
           req.flash('error',err);
           res.redirect('/classes');
        }
    });
});
route.delete('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='delete * from classes where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'class deleted'
            });
        }
        else
        {
            res.status(401).json({
                msg:'error occured',
                error:err
            });
        }
    });
});
module.exports=router;