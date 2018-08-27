
const port = process.env.PORT || 3001;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let _ = require('lodash');

// COSMOSDB_CONNSTR={Your MongoDB Connection String Here}
// COSMOSDB_DBNAME={Your DB Name Here}

var mongoose = require('mongoose');
const mongoUri = `mongodb://${process.env.ACCOUNT_NAME}:${process.env.M_KEY}@${process.env.ACCOUNT_NAME}.documents.azure.com:${process.env.PORT_NUM}/${process.env.DATAB_NAME}?ssl=true`;
mongoose.set('debug', true);
mongoose.connect(mongoUri, { useMongoClient: true });
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
    res.sendFile(__dirname + "/client/page.html");
});

app.get('/:id', function(req,res) {
    console.log("sent");
    res.json( {ID: req.params.id});
});


app.listen(port, () => console.log('Example app listening on port 3002!'));