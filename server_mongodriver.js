const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/test';

//Connecting
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if(err){
        console.log('Could not connect to mongodb');
    }
    var db = client.db('test');
    console.log('Connected!');
    client.close();
});

//Inserting
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {

    const cars = [
        {
            model: "Chevy", 
            year: "2017"
        },
        {
            model: "Nissan",
            year: "2000"
        }
    ];

    var db = client.db('test');
    db.collection('Cars').insert(cars, (err, res) => {
        if(err){
            console.log(`Cannot insert: ${err}`);
        }
        console.log(res.ops);
    });
    client.close();
});

//Querying
MongoClient.connect(url, {useNewUrlParser: true}, (err,client) => {
    var db = client.db('test');
    
    //Alternative to find is findOne()
    db.collection('Cars').find({year:"2000"}).project({model:0})
    //.skip(1).limit(1).sort({_id:-1})
    .toArray().then(
        data => {
            console.log(data);
        }
    );
    client.close();

});

//Deleting
MongoClient.connect(url, {useNewUrlParser: true}, (err,client) => {
    var db = client.db('test');
    
    //Second argument callback is an alternative to promise.then() for all actions, not just delete.
    //Alternatives to deleteMany() are deleteOne() and findOneAndDelete().
    db.collection('Cars').deleteMany({year:"2000"}, (err,doc)=>{
        console.log(doc);
    });
    client.close();
});

//Updating
MongoClient.connect(url, {useNewUrlParser: true}, (err,client) => {
    var db = client.db('test');
    db.collection('Cars').findOneAndUpdate(
        {
            name: "Francis",
        },
        {
            $set: {
                lastname: "Michaelson"
            },
            $inc: {
                age: +2
            }
        },
        {
            upsert: true,
            returnOriginal: false
        },
        (err,doc) => {
            console.log(doc);
        }
    );
    client.close();
});