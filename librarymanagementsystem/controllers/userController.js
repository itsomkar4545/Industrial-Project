const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { route } = require('./bookController');
router.post('/add',(req,res)=>{
    const {name,email,phone}=req.body;
    let sql='insert into users set ?';
    let body={name:name,email:email,phone:phone};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','user created');
            res.redirect('/users');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/users');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from users where id=?'
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                user:result[0]
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
    const {name,email,phone}=req.body;
    let sql='update users set name=?,email=?,phone=? where id=?';
    let body=[name,email,phone,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'user details updated'
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
    let sql='delete from users where id=?';
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