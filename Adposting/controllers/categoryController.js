const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { route } = require('.');
router.post('/add',(req,res)=>{
    const {name}=req.body;
    let sql='insert into category set ?';
    let body={name:name};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','category created');
            res.redirect('/admin/category');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/admin/category');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from category where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                category:result[0]
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
    let sql='update category set name=? where id=?';
    let body=[name,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'Category updated'
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
    let sql='delete from category where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'category deleted'
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