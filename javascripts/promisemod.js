deifne(["jquery", 'q'], function($, Q) {
  
  var deferred - Q.defer();

  $.ajax({
   url: "get-sons.json"
  })
  .done(function(songs_data){

  })
  .fail(function(xhr, status, error) {

  });
	
	return deferred.promise

});