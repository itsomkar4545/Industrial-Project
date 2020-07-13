const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { route } = require('.');
router.post('/register',(req,res)=>{
    const {name,email}=req.body;
    let body={name:name,email:email};
    let sql='insert into user set ?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','user registered');
            res.redirect('/register');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/register');
        }
    });
});
router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='delete from user where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'user deleted'
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