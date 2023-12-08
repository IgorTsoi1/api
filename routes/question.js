const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/question')
const Test = require('../models/test')


router.post('/',  (req,res,next) => {
    Question.find()
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    })

    router.post('/create', (req,res,next) => {
        const id = req.body.testId
        Test.findById(id).then(test => {
                return question
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json(result)  
                 })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                       error: err
                    })
                 })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                   message: 'Test not found',
                   error: err
                })
             })
        const question = new Question({
            _id: new mongoose.Types.ObjectId(),
            question: req.body.question,
            test: req.body.test
        })
    })


    router.post("/find/:testId",  (req,res,next) => {
        const id = req.params.testId
        Question.find({test: id})
        .select("_id question test")
        .exec()
        .then(result => {
            console.log(result)
            if(result){
                res.status(200).json({
                    result
                })
            } else{
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({eror:err})
        })
    })


    router.post("/:questionId",(req,res,next)=>{
        const id = req.params.questionId
        Question.findById(id)
        .select("_id question test")
        .exec()
        .then(result => {
            console.log(result)
            if(result){
                res.status(200).json({
                    _id: result._id,
                    question: result.question,
                    test: result.test
                })
            } else{
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({eror:err})
        })
    })

    router.post("/delete/:questionId", (req,res,next)=>{
        const id = req.params.questionId
        Question.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "question deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
    })
    
    router.post("/update/:questionId",(req,res,next)=>{
        const id = req.params.questionId
        Question.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(
                result
                )
            })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })




module.exports = router;
