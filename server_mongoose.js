const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test';

mongoose.Promise = global.Promise;
mongoose.connect(url);

const carSchema = mongoose.Schema({
    brand: String, 
    model: String, 
    year: Number,
    avail: Boolean
});

const Car = mongoose.model('Car', carSchema);

//Adding document
const addCar = new Car(
    {
        brand: 'Chevy', 
        model: 'Impala', 
        year: 2015,
        avail: true
    }
);

addCar.save((err,doc)=>{
    if(err){
        console.log(err);
    }
    console.log(doc);
});

//Querying
Car.find({brand:"Ford"},(err,doc)=>{
    if(err){
        console.log(err);
    }
    console.log(doc);
});

//Remove
Car.remove({year:2015},(err,doc)=>{
    if(err){
        console.log(err);
    }
    console.log(doc);
});

//Update
Car.update(
    {_id:"5b70a2f31a9a785ecef464a0"},
    {$set:{
        brand:"Ford"}
    },
    {
        //Figure out how to show modified item
        upsert: true
    },
    (err,doc)=>{
        if(err){
            console.log(err);
        }
        console.log(doc);
    }
);


