const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/add',(req,res)=>{
    const {name,age}=req.body;
    let date=Date.now();
    let body={name:name,age:age,joinedon:date};
    let sql='insert into members set ?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','Member registered');
            res.redirect('/members');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/members');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from members where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               member:result[0]
           });
        }
        else
        {
            res.status(401).json({
                msg:'error occrued',
                error:err
            });
        }
    });
});
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {name,age}=req.body;
    let sql='update members name=? , age =? where id=?';
    let body=[name,age,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               msg:'Member details updated'
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
    let sql='delete from members where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               msg:'members deleted'
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