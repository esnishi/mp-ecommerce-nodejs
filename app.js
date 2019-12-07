var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var bodyParser  = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var mercadopago = require('mercadopago');


var port = process.env.PORT || 3000




app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/processar_pagamento', function (req, res) {
console.log('step 01 ');
 mercadopago.configurations.setAccessToken("TEST-6947404896832499-120714-83ea9df1a054e706ad0e12d793be07ab-184746054");
console.log('step 022 ' +req.body.token;


 var payment_data = {
   transaction_amount: 181,
   token: req.body.token,
   description: req.body.description,
   installments: req.body.installments,
   payment_method_id: req.body.payment_method_id,
   payer: {
     email: req.body.email
   }
 };
console.log(payment_data);
 // Save and posting the payment

 mercadopago.payment.save(payment_data).then(function (data) {
       console.log('metodo - save  ');
       console.log(data);
       res.send(data);
     }).catch(function (error) {
       console.log(error);
     });





});

app.listen(port);



