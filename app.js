var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/processar_pagamento', function (req, res, body) {

  console.log('the response will be sent by the next function ...');

    var text = JSON.parse(body);
     console.log(text);

  res.send('Hello from B!');
});

app.listen(port);



