const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Test = require("../models/test")


router.post('/all', (req,res,next)=> {
    Test.find()
    .exec()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            result
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post('/find/:testId', (req,res,next)=>{
    Test.findById(req.params.testId)
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
        res.status(500).json({
            error: err
        })
    })
})

router.post('/create',(req, res, next) => {
    const newTest = new Test({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })
    newTest.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Test created',
            createdQuestion: newTest
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


router.post('/delete/:testId',(req,res,next) => {
    const id = req.params.testId
    Test.findByIdAndRemove(id)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "test deleted"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })

})

router.post('/update/:testId',(req,res,next)=> {
    const id = req.params.testId
    Test.findByIdAndUpdate(id, { $set: req.body }, { new: true })
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
