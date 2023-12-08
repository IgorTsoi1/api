const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Answer = require('../models/answer')
const Question = require('../models/question')


router.post('/',  (req,res,next) => {
Answer.find()
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
    const id = req.body.questionId
    Question.findById(id).then(question => {
            return answer
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
               message: 'Question not found',
               error: err
            })
         })
    const answer = new Answer({
        _id: new mongoose.Types.ObjectId(),
        answer: req.body.answer,
        points: req.body.points,
        question: req.body.question
    })
})

router.post("/find/:questionId",  (req,res,next) => {
    const id = req.params.questionId
    Answer.find({question: id})
    .select("_id answer points question")
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

router.post("/:answerId", (req,res,next)=>{
    const id = req.params.answerId
    Answer.findById(id)
    .select("_id answer points question")
    .exec()
    .then(result => {
        console.log(result)
        if(result){
            res.status(200).json({
                _id: result._id,
                answer: result.answer,
                points: result.points,
                question: result.question
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

router.post("/delete/:answerId", (req,res,next)=>{
    const id = req.params.answerId
    Answer.findByIdAndRemove(id)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "answer deleted"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.post("/update/:answerId",(req,res,next)=>{
    const id = req.params.answerId
    Answer.findByIdAndUpdate(id, { $set: req.body }, { new: true })
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
