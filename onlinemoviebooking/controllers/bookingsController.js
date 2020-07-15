const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/book',(req,res)=>{
    const {movie,timing,email,persons}=req.body;
    let sql='insert into bookings set ?';
    let body={movie:movie,timing:timing,email:email,persons:persons};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','booking confirmed');
            res.redirect('/');
        
        }
        else
        {
                req.flash('error',err);
                res.redirect('/');
        }
    });
});
router.delete('/:id',(req,res)=>{
    let {id}=req.params;
    let sql='delete from bookings where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'booking cancelled'
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