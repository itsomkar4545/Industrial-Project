const express=require('express');
const db=require('../config/database');
const router=express.Router();
router.get('/',(req,res)=>{
    let sql='select ads.id as id,ads.title,ads.description,category.name as category,user.name as postedby,ads.picture from ads join category on ads.category=category.id join user on ads.postedby=user.id ';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('index',{ads:result});
        }
        else
        {
            res.render('index',{error:err});
        }
    });
});
router.get('/register',(req,res)=>{
    res.render('register');
});
router.get('/postad',(req,res)=>{
    res.render('adpost');
});
router.get('/ad/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select ads.id as id,ads.title,ads.description,category.name as category,user.name as username,user.email as email,ads.picture from ads join category on ads.category=category.id join user on ads.postedby=user.id where ads.id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.render('ad',{ad:result[0]});
        }
        else
        {
            res.render('ad',{error:err});
        }
    });
});
router.get('/admin',(req,res)=>{
    let sql='select * from ads';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('admin',{ads:result,layout:'secondary'});
        }
        else
        {
            res.render('admin',{error:err,layout:'secondary'});
        }
    });
});
router.get('/admin/users',(req,res)=>{
    let sql='select * from user';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('users',{users:result,layout:'secondary'});
        }
        else
        {
            res.render('users',{error:err,layout:'secondary'});
        }
    });
});
router.get('/admin/category',(req,res)=>{
    let sql='select * from category';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('category',{categories:result,layout:'secondary'});
        }
        else
        {
            res.render('category',{error:err,layout:'secondary'});
        }
    });
});
module.exports=router;