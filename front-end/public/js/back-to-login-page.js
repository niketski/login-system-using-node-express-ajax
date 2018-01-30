$(document).ready(function(){
	var btn = $('#back-btn, #go-to-login');

	btn.on('click', function(){
		console.log('clicked');
		window.location.assign('/csa-login');
	});
});