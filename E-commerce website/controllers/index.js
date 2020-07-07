const express=require('express');
const db=require('../config/database');
const router=express.Router();
router.get('/',(req,res)=>{
    let sql='select products.id,products.name,products.cost,type.name as type from products join type on type.id=products.type';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('index',{products:result});
        }
        else
        {
           res.render('index',{error:err});
        }
    });
});
router.get('/product/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select products.id,products.name,products.cost,type.name as type from products join type on type.id=products.type where products.id=?';
    db.query(sql,(err,result)=>{
        if(!err)
        {
           res.render('product',{products:result});
        }
        else
        {
           res.render('product',{msg:`Product doesn't exist`});
        }
    });
});
router.get('/cart',(req,res)=>{
    let sql='select * from cart';
    db.query(sql,(err,result)=>{
        if(!err)
        {
           res.render('cart',{cart:result,layout:'secondary'});
        }
        else
        {
           res.render('cart',{msg:'no items added to the Cart'});
        }
    });
});
router.get('/checkout/:id',(req,res)=>{
        let {id}=req.params;
        let sql ='select * from orders where id=?';
        db.query(sql,[id],(err,result)=>{
            if(!err)
            {
                res.render('checkout',{orderdetails:result[1],layout:'secondary'});
            }
            else
            {
                res.render('checkout',{msg:'error occrued',layout:'secondary'});
            }
        });
});
router.get('/final/:id',(req,res)=>{
    let {id}=req.params;
    res.render('final',{id:id,layout:'secondary'});
});
router.get('/admin',(req,res)=>{
    let sql='select * from product';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('admin',{products:result,layout:'adminlayout'});
        }
        else
        {
           res.render('admin',{error:err});
        }
    });
});
router.get('/type',(req,res)=>{
    let sql='select * from type';
    db.query(sql,(err,result)=>{
        if(!err)
        {
           res.render('admin',{types:result,layout:'adminlayout'});
        }
        else
        {
           res.render('admin',{error:err});
        }
    });
});
module.exports=router;