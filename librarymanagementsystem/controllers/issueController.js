const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { response } = require('express');
const { route } = require('./bookController');
router.post('/issue',(req,res)=>{
    const {user,book,daysoc}=req.body;
    const date=Date.now();
    let sql='insert into issues set ?';
    let body={book:book,user:user,daysoc:daysoc,issuedate:date};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','Book issued');
            res.redirect('/books/issue');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/books/issue');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from issues where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                issue:result[0]
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
    let sql='delete from issues where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'Book deleted'
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