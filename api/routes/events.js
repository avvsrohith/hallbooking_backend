const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Event = require('../models/event');

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

router.get('/', (req, res, next) => {
    Event.find({}).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
})

// router.options('/', cors(corsOptions));

router.post('/', (req, res, next) => {
    console.log(req.body);
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        personName: req.body.personName,
        personContact: req.body.personContact,
        date: req.body.date,
        hall: req.body.hall,
        eventname: req.body.eventname,
        starttime: req.body.starttime,
        endtime: req.body.endtime
    });
    event.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    res.status(201).json({
        message: 'Event POST',
        event: event
    })
})

module.exports = router;