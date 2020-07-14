const express=require('express');
const router=express.Router();
const db=require('../config/database');
const multer=require('multer');
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
router.get('/add',upload.single('picture'),(req,res)=>{
    const {name,author,isbn}=req.body;
    const {picture}=req.file.path;
    cloudinary.v2.uploader.upload(picture)
    .then((image)=>{
        let sql='insert into books set ?';
        let body={name:name,author:author,isbn:isbn,picture:image.secure_url};
        db.query(sql,body,(err,result)=>{
            if(!err)
            {
                req.flash('success_msg','books added');
                res.redirect('/books/manage');
            }
            else
            {
                req.flash('error',err);
                res.redirect('/books/manage');
            }
        });
    })
    .catch(err=>{
        req.flash('error',err);
        res.redirect('/books/manage');
    });
});
router.get('/get/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                book:result[0]
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
    const {name,isbn,author}=req.body;
    let sql='update books set name=?,isbn=?,author=? where id=?';
    let body=[name,isbn,author,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'books details updated'
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
    let sql='delete from books where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'books deleted'
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