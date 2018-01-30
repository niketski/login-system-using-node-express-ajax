$(document).ready(function(){
	$(window).on('click', function(event){

		var modalCon = $('#main-modal-con');
	


		if(event.target.id == 'main-modal-con'){
			modalCon.css('display', 'none');
		}
	});

	$('#close-btn').on('click', function(){
		$('#main-modal-con').css({ display: 'none'});
	});

});