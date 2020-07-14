const express=require('express');
const router=express.Router();
const db=require('../config/database');
const { route } = require('./bookController');
router.get('/',(req,res)=>{
    let sql='select count(id) as books from books'
    db.query(sql,(err,result)=>{
        if(!err)
        {
            let sql1='select count(id) as issuedbooks from issues';
            db.query(sql1,(error,result1)=>{
               let sql2='select count(id) as users from users';
               if(!error)
               {
                db.query(sql2,(error1,result2)=>{
                    if(!error1)
                    {
                        res.render('index',{books:result,issuedbooks:result1,users:result2});
                    }
                    else
                    {
                        res.render('index',{error:error1});
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
router.get('/users',(req,res)=>{
    let sql='select * from users';
     db.query(sql,(err,result)=>{
         if(!err)
         {
            res.render('users',{users:result});
         }
         else
         {
            res.render('users',{error:err});
         }
     });
});
router.get('/books/issue',(req,res)=>{
    let sql='select issues.id,books.name as bookname,users.name as username,issues.dayoc as days from issues join books on issues.book=books.id join users on issues.user=users.id ';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            let sql1='select * from books';
            db.query(sql1,(error,result1)=>{
                if(!error)
                {
                    let sql2='select * from users';
                db.query(sql2,(error1,result2)=>{
                    if(!error1)
                    {
                        res.render('issue',{issues:result,books:result1,users:result2});
                    }
                    else
                    {
                        res.render('issue',{error:error1});
                    }
                });
                }
                else
                {
                    res.render('issue',{error:error});
                }
            });
        }
        else
        {
            res.render('issue',{error:err});
        }
    });
});
router.get('/books/manage',(req,res)=>{
    let sql='select * from books';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('books',{books:result});
        }
        else
        {
            res.render('books',{error:err});
        }
    });
});
module.exports=router;