const express=require('express');
const router=express.Router();
const db=require('../config/database');
const multer=require('multer');
const cloudinary=require('cloudinary');
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
    const {name,speciality}=req.body;
    cloudinary.v2.uploader.upload(req.file.path)
    .then((image)=>{
         let body={name:name,speciality:speciality,picture:image.secure_url};
         let sql='insert into instructors set ?';
         db.query(sql,body,(err,result)=>{
            if(!err)
            {
               req.flash('success_msg','instructor created');
               res.redirect('/instructors');
            }
            else
            {
               req.flash('error',err);
               res.redirect('/instructors');
            }
         });
    })
    .catch(err=>{
        req.flash('error',err);
        res.redirect('/instructors')
    });
});
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {name,speciality}=req.body;
    let sql='update instructors set name=?,speciality=? where id=?';
    let body=[name,speciality,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'instructors details updated'
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
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from instructors where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
            instructor:result[0]
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
    let sql='delete from instructors where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
           res.status(200).json({
               msg:'instructors details deleted'
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