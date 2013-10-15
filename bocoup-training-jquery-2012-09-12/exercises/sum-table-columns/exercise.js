$(function() {
  
  $("tr").each(function() {
  	//$(this).addClass("selected"); // <---- right there with $(this)!
    var tr = $(this);
    var tds = tr.find('td');
    var sum = 0;
    var content;
    tds.each(function(){
    	//debugger;
    	content = $(this).html();
    	if(typeof +content === 'number'){
    		 sum += Number($(this).html());
    	}
    });
    var addMe = $('<td>');
    addMe.addClass("sum");
    addMe.html(sum);
    //tr.append("<td class='sum'>" + sum + "</td>");
    tr.append(addMe);
  });

});
