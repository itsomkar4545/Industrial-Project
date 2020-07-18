const express=require('express');
const router=express.Router();
const db=require('../config/database');
const cloudinary=require('cloudinary');
const multer=require('multer');
const { response } = require('express');
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

router.post('/postadv',upload.single('picture'),(req,res)=>{
	console.log("in second method");
    const {name,category,postedby,title,description}=req.body;
    cloudinary.v2.uploader.upload(req.file.path)
    .then((image)=>{
            let sql='insert into ads set?';
            let body={title:title,category:category,postedby:postedby,description:description,picture:image.secure_url};
            db.query(sql,body,(err,response)=>{
                if(!err)
                {
                    console.log("file upladed successfully");
                    req.flash('success_msg','Ad posted');
                    res.redirect('/');
                }
                else
                {
                	console.log('Error uploading file');
                    req.flash('error',err);
                    res.redirect('/');
                }
            });
    })
    .catch(err=>{
        console.log('Error uploading file in catch');
        req.flash('error',err);
        res.redirect('/');
    });
});

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='delete from ads where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'ad deleted'
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