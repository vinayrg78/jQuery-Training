$(function() {

  var myTables = $('table');

  myTables.each(function(){
    var myTable = $(this);
  	var myTableRows = myTable.find('tr');

  	var sumArray = [];
  	myTableRows.each(function(){
      var eachTr = $(this);
  	  var myTableTds = eachTr.children();
  		myTableTds.each(function(index){
        var eachTd = $(this);
  			if(!sumArray[index]){
  				sumArray[index] = Number(eachTd.text());
  			} else {
          sumArray[index] += Number(eachTd.text());
        }
  		});
  	});

    var newTr = $('<tr>');
    for(var i=0; i < sumArray.length; i++){
      var newTd = $('<td>');
      newTd.text(sumArray[i]).addClass('sum');
      newTr.append(newTd);
    }
    myTable.find('tbody').append(newTr);

  });
});