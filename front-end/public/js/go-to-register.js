$(document).ready(function(){
	var btn = $('#register-btn');

	btn.on('click', function(){
		console.log('clicked');
		window.location.assign('/csa-register');
	});
});