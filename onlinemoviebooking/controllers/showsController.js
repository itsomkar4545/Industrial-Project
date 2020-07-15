const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/add',(req,res)=>{
    const {movie,timing}=req.body;
    let body={movie:movie,timings:timing};
    let sql='insert into shows set ?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','show created');
            res.redirect('/admin/shows');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/admin/shows');
        }
    });

});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from shows where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                shows:result[0]
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
    let {id}=req.params;
    let {movie,timing}=req.body;
    let sql='update shows set movie=? , timing=? where id=?';
    let body=[movie,timing,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'show updated'
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
    let sql='delete from show where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'show deleted'
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