$(function() {

	$('#searchForm').submit(function(event){
		event.preventDefault();
		var qVal = $("#searchForm input[name='q']");

		var jqXhrForData = $.getJSON("/data/search.json", "q="+qVal.val());
		var jqXhrForTemplate = $.ajax("/templates/people-detailed.tmpl");

		$.when(jqXhrForTemplate, jqXhrForData).then(function(tmpl, data) {
		  //var tmpl = $("#tmpl-person").text();
		  var fixedData = {people: data[0].results};
		  var html = _.template(tmpl[0], fixedData);
		  $("#results").html(html);
		});
	});



});


