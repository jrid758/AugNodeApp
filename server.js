
const port = process.env.PORT || 3001;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function(req,res) {
    console.log("sent");
    //console.log("Where are we?: " + __dirname + process.env.PORT);
    res.sendFile(__dirname + "/client/page.html");
});

app.get('/:id', function(req,res) {
    console.log("sent");
    res.json( {ID: req.params.id});
});


app.listen(port, () => console.log('Example app listening on port 3002!'));