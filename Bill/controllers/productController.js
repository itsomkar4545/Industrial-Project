const db=require('../config/database');
const express=require('express');
const router=express.Router();
router.post('/add',(req,res)=>{
    const {name,type,cost}=req.body;
    let sql='insert into product set ?';
    let body={name:name,type:type,cost:cost};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           req.flash('success_msg','Product created');
           res.redirect('/product');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/product');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from product id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               product:result[0]
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
    const {name,cost,type}=req.body;
    let sql='update product name=? cost =? type=? where id =?';
    let body=[name,cost,type,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'product details updated'
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
    let {id}=req.params;
    let sql='delete from product where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               msg:'product deleted'
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