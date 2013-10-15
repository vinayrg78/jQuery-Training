$(function() {

	$('button').on('click', function handler(event){
		var button = $(this);
		event.preventDefault();

		var pluralObj = button.find('.plural');
		var numberObj = button.find('.number');
		var newButtonCount = Number(numberObj.text()) - 1;

		if(newButtonCount >= 0){
			numberObj.text(newButtonCount);
		}
		if(newButtonCount === 1){
			pluralObj.text("");
		} else if(newButtonCount === 0){
			pluralObj.text("s");
			button.attr("disabled", "disabled");
			button.off("click", handler);
		}
	});
});


