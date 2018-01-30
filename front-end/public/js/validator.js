$(document).ready(function(){
	var inputElem = $('.inputs');
	var submitBtn = $('#submit-btn')

	function regex(inputClass, val, err){  //validates each input element

		var regEx;

		switch(inputClass){

			case 'strings': // this code will be executed if the input elem has strings class
				   regEx = /^[a-zA-Z\s]+$/; //matches strings only
			    var test = regEx.test(val);

				if(!test){
					err.html('Please don\'t use special characters');
				}else{
					err.html('');
				}

			break;

			case 'number': // this code will be executed if the input elem has number class
		            regEx = /^[0-9]+$/; //matches numbers only
				var test = regEx.test(val);

				if(!test){
					err.html('Please use numbers only');
				}else{
					err.html('');
				}
			break;

			case 'email': // this code will be executed if the input elem has email class
				regEx = /^[a-zA-Z0-9$%^&*()-_}{'"<>?/.,|]+\@([a-zA-Z]+)\.com$/; //matches valid email
				var test = regEx.test(val);

				if(!test){
					err.html('Invalid email address');
				}else{
					err.html('');
				}
			break;

			case 'confirm': // this code will be executed if the input elem has confirm class
				var password = $('#input-password');

				if(password.val() != val){
					err.html('Passwords don\'t match');
				}
				else{
					err.html('');
				}
			break;

			case 'username' : // this code will be executed if the input elem has username class

				$.ajax({
					type: 'GET',
					url : 'http://localhost:2000/csa/api/username',
					contentType : 'application/json',
					success: function(response){
						var userNameA = response;
						console.log(userNameA);

						function checkUserName(item){
							return val == item;
						}

						var test = userNameA.every(checkUserName);

						if(test){
							err.html('Username has been used, please try another');
						}else{
							err.html('');
						}
					}
				});

				

			break;

		} 

	}


	function validate(elem){
		var span = $('.err-' + $(elem).attr('name'));
		var val = $(elem).val();
	

		if(val === ''){
			span.html('You can\'t leave this empty');
		}
		else if($(elem).hasClass('strings')){
			
			regex('strings', val, span );

		}
		else if($(elem).hasClass('number')){
			regex('number', val , span);
		}
		else if($(elem).hasClass('email')){
			regex('email', val, span);
		}
		else if($(elem).hasClass('confirm')){
			regex('confirm', val, span);
		}
		else if($(elem).hasClass('username')){
			regex('username', val, span);
		}
		else{

			span.html('');
		}
	}

	
	//executes validate function on each elements if focus is lost

	inputElem.on('blur', function(){
		validate($(this));
	});

	submitBtn.on('click', function(){	
		
		var elem = [];


		$.each(inputElem, function(i, val){
			elem.push(val);
		});

		//checks if all inputs has value
		function hasValue(elem){
			return $(elem).val() != '';
		}

		//checks if all input elements has no error
		function noError(elem){
			var err = $(elem).next();

			return err.html() == '';
		}

		var hasInput = elem.every(hasValue);
		var hasNoError = elem.every(noError);
		
		console.log(hasInput, hasNoError)
	
		

		if(hasInput  && hasNoError ){
			var modalCon = $('#main-modal-con');
			modalCon.css({display : 'block'});

			var firstName = $('#input-first-name');
			var lastName = $('#input-last-name');
			var age = $('#input-age');
			var gender = $('#input-gender');
			var position = $('#input-position');	
			var userName = $('#input-username');
			var password = $('#input-password');
			var mobileNum = $('#input-mobile-number');
			var telNum = $('#input-telephone-number');
			var email = $('input-email');
			var contactName = $('#input-contact-name');
			var contactNumber = $('#input-contact-number');



			var user = {
				name : {
					firstName : firstName.val(),
					lastName : lastName.val()
				},
				age : age.val(),
				gender : gender.val(),
				position : position.val(),
				userName : userName.val(),
				password : password.val(),
				contact : {
					mobile : mobileNum.val(),
					telephone : telNum.val(),
					email : email.val()
				},
				contactPerson : {
					name : contactName.val(),
					number : contactNumber.val()
				}
			};	

			$.ajax({
				type: 'POST',
				url : 'http://localhost:3000/csa/api/username',
				contentType: 'application/json',
				data : JSON.stringify({"item" : userName.val()}),
				success: function(response){
					console.log(response);
				},
			});


			$.ajax({
				type: 'POST',
				url: 'http://localhost:2000/csa/users/api',
				contentType : 'application/json',
				data : JSON.stringify(user),
				success : function(response){
					console.log('new user has been added');					
				},

			});

			$('.inputs').val('');
			
		}else{
				$.each(inputElem, function(i, elem){
				validate(elem);
				});
		}

	});

});