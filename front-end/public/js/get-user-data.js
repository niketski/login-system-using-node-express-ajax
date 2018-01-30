$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:2000/csa/get-user',
		contentType: 'application/json',
		success: function(response){
			var parent = $('#user');

			console.log(response);
		}
	});
});