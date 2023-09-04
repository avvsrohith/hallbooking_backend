const express = require('express');
const app = express();
const halls = require('./api/routes/halls');
const events = require('./api/routes/events');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Rohith-Attili:AVVSR%40mongodb2003@avvsr-cluster.ghhcsxj.mongodb.net/?retryWrites=true&w=majority')

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }

    next();
});


app.use('/hall', halls);
app.use('/event', events);

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Listening'
    });
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json(
        {
            error: {
                message: error.message
            }
        }
    )
})


module.exports = app