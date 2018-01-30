var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/csa-login', function(req,res){
	fs.createReadStream(__dirname + '/public/html/login.html').pipe(res);
});

app.get('/csa-register', function(req,res){
	fs.createReadStream(__dirname + '/public/html/register.html').pipe(res);
});

app.get('/csa/user/', function(req,res){
	fs.createReadStream(__dirname + '/public/html/user.html').pipe(res);
});

app.listen(1000);
