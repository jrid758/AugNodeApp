console.log("test");

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function(req,res) {
    console.log("sent");
    res.sendFile(__dirname + "/client/page.html");
});

app.get('/:id', function(req,res) {
    console.log("sent");
    res.json( {ID: req.params.id});
});


app.listen(3002, () => console.log('Example app listening on port 3002!'));