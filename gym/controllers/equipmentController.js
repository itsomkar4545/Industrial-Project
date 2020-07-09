const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { route } = require('.');
router.post('/add',(req,res)=>{
    const {name}=req.body;
    let body={name:name};
    let sql='insert into equipments set ?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','equipment created');
            res.redirect('/equipments');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/equipments');
       
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from equipments where id=?';
    let body=[id];
    db.sql(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               equipments:result[0]
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
    let sql='update equipments set name=? where id=?';
    let body=[name,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               msg:'equipments updated'
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
router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='delete from equipments where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'equipments deleted'
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