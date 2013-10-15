$(function() {

	var icon = $('<i/>').addClass('icon-minus');
	$('th').append(icon);

	$('thead').on('click', function(event){
		var myThead = $(this);
		var currIcon = myThead.find('i');
		var currIconClass = currIcon.attr('class');
		var correspondingTbody = myThead.next();

		currIcon.toggleClass("icon-minus icon-plus");
		if(currIconClass === 'icon-minus'){
			$(correspondingTbody).hide();
		} else {
			$(correspondingTbody).show();
		}
	});

	$('thead').on('mouseover mouseout', function(event){
		$('html').toggleClass('js');
	});
});
