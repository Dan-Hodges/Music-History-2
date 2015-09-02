define(["jquery", "q"], function($, Q) {
  
  return function(argument) {
    var deferred = Q.defer();

    $.ajax({
			  url: "https://blistering-torch-3779.firebaseio.com/songs.json",
			  method: "POST",
			  data: JSON.stringify(argument)
		})
    .done(function(argument) {
      deferred.resolve(argument);
    })
    .fail(function(xhr, status, error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

});