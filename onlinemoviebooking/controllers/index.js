const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.get('/',(req,res)=>{
    let sql='select shows.id,movies.picture as image,movies.name as moviename from shows join movies on shows.movie=movies.id join  order by shows.id 0,5';
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