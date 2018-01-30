$(document).ready(function(){
	var btn = $('#login-btn');

	// change color of input elements and icons
	function changeColor(){
		var bars = $('.inputs');
		var icons = $('div.texts i');
		
		icons.css('color', '#ec171f');
		bars.css('border', '1px solid #ec171f');
	}


	// default color of input elements and icons
	function colorDefault(){
		var bars = $('.inputs');
		var icons = $('div.texts i');
		var message = $('#login-err');

		message.css('display', 'none');
		icons.css('color', '#00adef');
		bars.css('border', '1px solid #00adef');
	}


	//check if all input has value
	function hasValue(){
		var userName = $('#username');
		var passWord = $('#password');

		if(userName.val() != '' && passWord.val() != ''){
			return true;
		}
		else{
			return false;
		}
	}


	//login button
	btn.on('click', function(){

		    var userName = $('#username');
			var passWord = $('#password');
		    var message = $('#login-err');
		   
		
		if(hasValue()){
			colorDefault();

			//get data from server
			$.ajax({
				type : 'GET',
				url : 'http://localhost:2000/csa/users/api',
				contentType : 'application/json',
				success : function(res){
					
					//checks if the inputted username is equal to one of each username from the server
					//if true it returns the all data of matched username
					function validate(item){
						return userName.val() == item.userName;
					}

					var users = res;
					var acct = users.find(validate) || undefined; //acct object
					


					if(!acct){ //if not found do this 
						changeColor();
						message.css('display', 'block');
						message.html('Invalid Account');
					}
					else if(acct.userName == userName.val() && acct.passWord == passWord.val()){ // if username and password are valid do this
						colorDefault();
						message.css('display', 'none');

						$.ajax({
							type: 'POST',
							url: 'http://localhost:2000/csa/post-username',
							contentType: 'application/json',
							data: JSON.stringify({item : userName.val()}),
							success: function(res){
								console.log(res);
							}
						});

						setTimeout(function(){
							window.location.assign('/csa/user');
						},1500);
					}
					else if(acct.userName == userName.val()){ //if the password is incorrect do this
						changeColor();
						message.css('display', 'block');
						message.html('Incorrect Password');
					}	
					

				}
			});

			


		}else{
			

		    if(userName.val() == ''){
		    	changeColor();
		    	message.css('display', 'block');
		    	message.html('Enter your Username');
		    }
		    else if(passWord.val() == ''){
		    	changeColor();
		    	message.css('display', 'block');
		    	message.html('Enter your Password');
		    }
		}
		

		
	});
});