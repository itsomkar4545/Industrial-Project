const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { route } = require('../../travelbooking/controllers');
router.get('/',(req,res)=>{
    let sql='select count(id) as users from applications';
    let sql1='select count(id) as job from jobs';
    let sql2='select count(id) as companies from company';
    let sql3='select jobs.id,jobs.title,jobs.description,companies.name from jobs join companies on jobs.company=companies.id order by jobs.id desc 0,5';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            db.query(sql1,(error,result1)=>{
                if(!err)
                {
                        db.query(sql2,(error1,result2)=>{
                            if(!error1)
                            {
                                db.query(sql3,(error2,result3)=>{
                                    if(!error2)
                                    {
                                        res.render('index',{users:result,jobs:result1,companies:result2,ljobs:result3});
                                    }
                                    else
                                    {
                                        res.render('index',{error:error2});
                                    }
                                });
                            }
                            else
                            {
                                res.render('index',{error:erro1});
                            }
                        });
                }
                else
                {
                    res.render('index',{error:error});
                }
            });
        }
        else
        {
            res.render('index',{error:err});
        }
    });
});
router.get('/jobs',(req,res)=>{
    let sql='select job.id,job.title,company.name as company,type.name as type,jobs.description from jobs';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('jobs',{jobs:result});
        }
        else
        {
            res.render('jobs',{error:err});
        }
    });
});
router.get('/about',(req,res)=>{
    res.render('about');
});
router.get('/job/:id',(req,res)=>{
    res.render('userapply',{jobid:id});
});
router.get('/admin',(req,res)=>{
    let sql='select user.id,user.name,user.email,jobs.title from applications join jobs on applications.job=jobs.id';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('adminsuers',{uers:result,layout:'admin'});
        }
        else
        {
            res.render('adminusers',{error:err,layout:'admin'});
        }   
    });
});
router.get('/admin/jobs',(req,res)=>{
    let sql='select * from jobs';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('adminjob',{jobs:result,layout:'admin'});
        }
        else
        {
            res.render('adminjob',{error:err,layout:'admin'});
        }
    });
});
router.get('/admin/type',(req,res)=>{
    let sql='select * from type';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('admintype',{types:result,laout:'admin'});
        }
        else
        {
            res.render('admintype',{error:err,layout:'admin'});
        }
    });
});
router.get('/admin/companies',(req,res)=>{
    let sql='select * from companies';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('admincompanies',{companies:result,layout:'admin'});
        }
        else
        {
            res.render('admincompanies',{error:err,layout:'admin'});
        }
    });
});
module.exports=router;