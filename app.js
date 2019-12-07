var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser  = require('body-parser');
var mercadopago = require('mercadopago');


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

app.post('/processar_pagamento', function (req, res) {
console.log('step 01 ');
 mercadopago.configurations.setAccessToken("TEST-6947404896832499-120714-83ea9df1a054e706ad0e12d793be07ab-184746054");
console.log('step 02 ');
 var payment_data = {
   transaction_amount: 181,
   token: 'ff8080814c11e237014c1ff593b57b4d',
   description: 'Lightweight Silk Watch',
   installments: 1,
   payment_method_id: 'visa',
   payer: {
     email: 'destini@live.com'
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

console.log('step 04 ');

  res.render('detail', req.query);

});

app.listen(port);



