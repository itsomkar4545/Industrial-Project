const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/add',(req,res)=>{
    const {timing}=req.body;
    let sql='insert into timings set ?';
    let body={timing:timing};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','timings created');
            res.redirect('/admin/timings');
        }
        else
        {
            req.flash('error',err);
            req.redirect('/admin/timings');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from timings where id=?';
    let body=[id];
    db.query(sql,bod,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                timing:result[0]
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
    const {timing}=req.body
    let body=[timing,id];
    let sql='update timings set timing=? where id=?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'timing updated'
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
    let {id}=req.params;
    let body=[id];
    let sql='delete from timings where id=?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'timing deleted'
            });
        }
        else
        {
            res.status(401).json({
                msg:'errror occured',
                error:err
            });
        }
    });
});
module.exports=router;