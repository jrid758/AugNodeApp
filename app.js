
const port = process.env.PORT || 3001;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let _ = require('lodash');
var mongoose = require('mongoose');

// COSMOSDB_CONNSTR={Your MongoDB Connection String Here}
// COSMOSDB_DBNAME={Your DB Name Here}
console.log("LOGIN INFO");
console.log(`mongodb://${process.env.ACCOUNT_NAME}:${process.env.M_KEY}@${process.env.ACCOUNT_NAME}.documents.azure.com:${process.env.PORT_NUM}/${process.env.DATAB_NAME}?ssl=true`);


const mongoUri = `mongodb://${process.env.ACCOUNT_NAME}:${process.env.M_KEY}@${process.env.ACCOUNT_NAME}.documents.azure.com:${process.env.PORT_NUM}/${process.env.DATAB_NAME}?ssl=true`;
mongoose.set('debug', true);
mongoose.connect(mongoUri, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db");
});


const Schema = mongoose.Schema;

const Heros = new Schema( {
    name: String,
    power: String
}
);

let Hero = mongoose.model('Hero', Heros);


function putHeroes(hit) {
    let bob = new Hero({name: hit, power: hit + " BANG"});
    // bob.save(function (err, fluffy) {
    //     if (err) {
    //         return console.error(err);
    //     } else {
    //     console.log("good");
    //     }
    // });

    bob.save();

    // const docquery = Hero.find({});
    // docquery
    //   .exec()
    //   .then(heroes => {
    //     res.status(200).json(heroes);
    //   })
    //   .catch(error => {
    //     res.status(500).send(error);
    //     return;
    //   });
  }
  





//mongoose.connect(process.env.COSMOSDB_CONNSTR+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb");


app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// mongodb://firstdbnode.documents.azure.com:10255/?ssl=true&replicaSet=globaldb
// firstdbnode
// 2H8VzRSkTOLeAtEAAmCnnelWCM7qPBetNLZYVd35NuO82zxw1GikrHEGu1E7g3wdvMWeM2PWwlwxEnHNifdWHA==

app.get('/', function(req,res) {
    console.log("sent");
    console.log("Where are we?: " + __dirname + " SPACE " + process.env.PORT);
    console.log("LOGIN INFO");
//console.log(`mongodb://${process.env.ACCOUNT_NAME}:${process.env.M_KEY}@${process.env.ACCOUNT_NAME}.documents.azure.com:${process.env.PORT_NUM}/${process.env.DATAB_NAME}?ssl=true`);
    res.sendFile(__dirname + "/client/page.html");
});

app.get('/:id', function(req,res) {
    console.log("sent");
    putHeroes(req.params.id);
    res.json( {ID: req.params.id});
});


app.listen(port, () => console.log('Example app listening on port 3002!'));