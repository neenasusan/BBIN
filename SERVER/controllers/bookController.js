const mongoose = require('mongoose');
const Book = mongoose.model('Book');
var ObjectId = require ('mongoose').Types.ObjectId;


module.exports.add =(req,res,next) => {
    //console.log('hello world');
    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.description= req.body.description;
    book.email=req.body.email;
    Book.findOne({title:req.body.title,email:req.body.email},{$exists: true},(err,doc) => {
        if(doc){
            console.log('found one');
            return next(Error ('test'));
            //res.status(422).send(['Duplicate title found']);
        }
        else{console.log("not there");
        book.save((err,doc)=>{
            if(!err)
            res.send(doc);
            else{
             return next(err);
            }
        });
    }
    });
    // book.save((err,doc)=>{
    //     if(!err)
    //     res.send(doc);
    //     else{
    //         if(err.code == 11000)
    //             res.status(422).send(['Duplicate title found']);
    //             else
    //                 return next(err);
    //     }
    // });

}

module.exports.display =(req,res) => {
    Book.find((err,docs) => {
         if(!err) {res.send(docs);}
         else{console.log('error in retriving Books'+JSON.stringify(err,undefined,2));}
         });
}


module.exports.displayOne =(req,res) => {
    if(!ObjectId.isValid(req.params._id))
         return res.status(400).send(`No record with given id: ${req.params._id}`);
    Book.findById(req.params._id,(err,doc) => {
                if(!err) {res.send(doc);}
                else{console.log('error in retriving Books'+JSON.stringify(err,undefined,2));}
     });
};

module.exports.displayEmail =(req,res) => {
    Book.find({email:req.params.email},(err,doc) => {
        if(!err) {res.send(doc);}
        else{console.log('error in retriving Books'+JSON.stringify(err,undefined,2));}
    });
    //console.log(req.params.email);
};


module.exports.delete =(req,res) => {
    if(!ObjectId.isValid(req.params._id))
         return res.status(400).send(`No record with given id: ${req.params.id}`);
        Book.findByIdAndRemove(req.params._id,(err,doc) =>{
             if(!err) {res.send(doc);}
             else{console.log('error in saving Books'+JSON.stringify(err,undefined,2));}  
         });
};


// const express = require('express');
// var router = express.Router();
// var ObjectId = require ('mongoose').Types.ObjectId;

// var {Book} = require('../models/book');

// router.get('/',(req,res) => {
// Book.find((err,docs) => {
//     if(!err) {res.send(docs);}
//     else{console.log('error in retriving Books'+JSON.stringify(err,undefined,2));}
// });
// });

// router.get('/:id',(req,res) => {
//     if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id: ${req.params.id}`);

//         Book.findById(req.params.id,(err,doc) => {
//         if(!err) {res.send(doc);}
//         else{console.log('error in retriving Books'+JSON.stringify(err,undefined,2));}

//     });
//     });

// router.post('/',(req,res) => {
//    var bk = new Book({
//     title:req.body.title,
//     author:req.body.author,
//     description:req.body.description
//     });
//     bk.save((err,doc) => {
//         if(!err) {res.send(doc);}
//         else{console.log('error in saving Books'+JSON.stringify(err,undefined,2));}
//     });
//     });

//     router.delete('/:id',(req,res) => {
//         if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id: ${req.params.id}`);
//         Book.findByIdAndRemove(req.params.id,(err,doc) =>{
//             if(!err) {res.send(doc);}
//             else{console.log('error in saving Books'+JSON.stringify(err,undefined,2));}  
//         });
//          });




//module.exports = router;