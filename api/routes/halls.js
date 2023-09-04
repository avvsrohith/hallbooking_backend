const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

const Hall = require('../models/hall');

router.get('/', (req, res, next) => {
    Hall.find({}).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
})

router.post('/', (req, res, next) => {
    const hall = new Hall({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        capacity: req.body.capacity
    });
    hall.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
    res.status(201).json({
        message: 'Hall POST',
        hall: hall
    })
})

module.exports = router;