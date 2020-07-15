const express=require('express');
const router=express.Router();
const mysql=require('../config/database');
const cloudinary=require('cloudinary');
const multer=require('multer');
const db = require('../config/database');
const storage=multer.diskStorage({
    filename:(req,file,callback)=>{
        callback(null,Date.now()+file.originalname);
    }
});
const upload=multer({storage:storage});
cloudinary.config({
    cloud_name:'dkhk4gyey',
    api_key:'459656749761335',
    api_secret:'AS_y6ZzH7FAjeoIxF1IjtMFKzQg'
     
});
router.post('/add',upload.single('picture'),(req,res)=>{
    const {name,genre}=req.body;
    const {picture}=req.file.path;
    cloudinary.v2.uploader.upload(picture).then(image=>{
        let sql='insert into movies set ?';
        let body={name:name,genre:genre,picture:image.secure_url};
        db.query(sql,body,(err,result)=>{
            if(!err)
            {
                req.flash('success_msg','movie created');
                res.redirect('/admin/movies');
            }
            else
            {
                req.flash('error',err);
                res.redirect('/admin/movies');
             
            }
        });
    })
    .catch(err=>{
        req.flash('error',err);
        res.redirect('/admin/movies');
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from movies where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                movie:result[0]
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
router.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    let {name,genre}=req.body;
    let sql='update movies set name=?, genre=? where id=?';
    let body=[name,genre,id];
    db.query(sql,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'movie details updated'
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
    let sql='delete from movies where id=?';
    let {id}=req.params;
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'Movie deleted'
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