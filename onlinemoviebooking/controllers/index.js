const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.get('/',(req,res)=>{
    let sql='select shows.id,movies.picture as image,movies.name as moviename from shows join movies on shows.movie=movies.id order by shows.id 0,5';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('index',{movies:result});
        }
        else
        {
            res.render('index',{error:err});
        }
    });
});
router.get('/movies',(req,res)=>{
    let sql='select shows.id,movies.picture as image,movies.name as moviename from shows join movies on shows.movie=movies.id';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('movies',{movies:result});
        }
        else
        {
            res.render('movies',{error:err});
        }
    });
});
router.get('/movie/:id',(req,res)=>{
    const {id}=req.params;
    let sql ='select movies.id,movies.name,movies.picture.genres.name from movies join genres on movies.genre=genres.id where movies.id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            let sql='select shows.id,timings.timing as timings from shows join timings on shows.timings=timings.timing where shows.movie=? ';
            db.query(sql,body,(err,result1)=>{
                if(!err)
                {
                    res.render('movie',{movie:result[0],shows:result1});
                }
                else
                {
                    res.render('movie',{error:err});
                }
            });
        }
        else
        {
            res.render('movie',{error:err});
        }
    });
});
router.get('/admin',(req,res)=>{
    let sql='select bookings.id,movies.name as moviename,timings.timing as timing ,bookings.persons as persons from bookings join movies on bookings.movie=movies.id join timings on bookings.timing=timings.id';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('admin',{bookings:result,layout:'admin'});
        }
        else
        {
            res.render('admin',{error:err});
        }
    });
});
router.get('/admin/movies',(req,res)=>{
    let sql='select * from movies';
    db.query(sql,(err,result)=>{
        let sql2='select * from genres';
        db.query(sql2,(err,result1)=>{
            if(!err1)
            {
                res.render('adminmovies',{movies:result,genres:result1});
            }
            else
            {
                res.render('adminmovies',{error:err});
            }
        });
    });
});
router.get('/admin/shows',(req,res)=>{
    let sql='select shows.id,movies.name,timings.timing from shows join movies on shows.movie=movies.id join timings on shows.timing=timings.id';
    db.query(sql,(err,result)=>{
       if(!err)
       {
        let sql1='select * from movies';
        db.query(sql1,(error1,result1)=>{
            if(!err)
            {
                let sql2='select * from timings';
                db.query(sql2,(error2,result2)=>{
                    if(!err)
                    {
                        res.render('adminshows',{shows:result,movies:result1,timings:result2,layout:'admin'});
                    }
                    else
                    {
                        res.render('adminshows',{error:error2,layout:'admin'});
                    }
                });
            }
            else
            {
                res.render('adminshows',{err:error1,layout:'admin'});
            }
        });
       }
       else
       {
            res.render('adminshows',{err:err,layout:'admin'});
       }
    });
});
router.get('/admin/timings',(req,res)=>{
    let sql='select * from timings';
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.render('admintiming',{timings:result});
        }
        else
        {
            res.render('admintiming',{error:err});
        }
    });
});
module.exports=router;