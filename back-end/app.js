var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

//usernames 
var userNames = ['limsanity'];
var userGiven;
//my users array
var users = [
	{
		id : 1,
		name: {
			firstName : 'nico',
			lastName : 'Lim'
		},
		age : 22,
		gender : 'male',
		position :'cargo agent',
		userName : 'limsanity',
		passWord : '12345',
		contact : {
			mobile : '09161985074',
			telephone : '8700221',
			email: 'lim.nicolebenedict@gmail.com'
		},
		contactPerson : {
			name : 'Estrellita Lim',
			number : '09186825501'
		}
	}
];



var id = 1;


app.post('/csa/api/username', function(req,res){

	var newUserName = req.body.item;
	
	userNames.push(newUserName);

	res.send(userNames);
});


app.get('/csa/api/username', function(req,res){
	res.send(userNames);
});


app.get('/csa/users/api', function(req,res){
	res.send(users);
});


app.get('/csa/users/api/:id', function(req,res){
	var userUserName = req.params.id;

	console.log(userUserName);
	function findAcct(item){
		return userUserName == item.userName;
	}

	var acct = users.find(findAcct);

	res.send(acct);
});

app.post('/csa/users/api', function(req,res){
	id++;

	var newUser = req.body;
	console.log(newUser);

	users.push({
		id : id,
		name : {
			firstName : newUser.name.firstName,
			lastName : newUser.name.lastName
		},
		age : newUser.age,
		gender : newUser.gender,
		position : newUser.position,
		userName : newUser.userName,
		passWord : newUser.password,
		contact : {
			mobile : newUser.contact.mobile,
			telephone : newUser.contact.telephone,
			email : newUser.contact.email
		},
		contactPerson : {
			name : newUser.contactPerson.name,
			number: newUser.contactPerson.number
		}
	});

	console.log('new user');
	res.send(users[users.length - 1]);
});

app.post('/csa/post-username', function(req,res){

	var requestUser = req.body.item;
	userGiven = requestUser;	
	res.send(userGiven);
});

app.get('/csa/get-user', function(req,res){

	function match(item){
		return item.userName == userGiven;
	}

	var user = users.find(match);

	res.send(user);

});



app.listen(2000);

