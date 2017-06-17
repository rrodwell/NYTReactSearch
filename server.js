let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

let Article = require('./models/Article.js');

let app = express();
let PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

//mongoose.connect('mongodb://localhost/nytreact');
mongoose.connect('mongodb://heroku_zwtrswz4:aedjl79n37a7egi0evvj6u30jo@ds127872.mlab.com:27872/heroku_zwtrswz4');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function () {
    console.log('Mongoose connection successful.');
});

app.get('/', function(req, res){
    res.sendFile('./public/index.html');
});

app.get('/api/saved', function(req, res) {

    Article.find({})
        .exec(function(err, doc){

            if(err){
                console.log(err);
            }
            else {
                res.send(doc);
            }
        })
});

app.post('/api/saved', function(req, res){

    var newArticle = new Article({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    });

    newArticle.save(function(err, doc){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.json(doc);
        }
    });

});

app.delete('/api/saved/:id', function(req, res){

    Article.find({'_id': req.params.id}).remove()
        .exec(function(err, doc) {
            res.send(doc);
        });

});



app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
