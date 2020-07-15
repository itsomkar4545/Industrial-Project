const express=require('express');
const db=require('../config/database');
const router=express.Router();
router.post('/add',(req,res)=>{
    const {name}=req.body;
    let sql='insert into genres set ?';
    let body={name:name};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','genre created');
            res.redirect('/admin/genres');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/admin/genres');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from genres where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                genre:result[0]
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
router.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    let sql='delete from genres where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'genre deleted'
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