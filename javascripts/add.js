define(function() {
  return {
    add: function(argument) {
      $.ajax({
			  url: "https://blistering-torch-3779.firebaseio.com/songs.json",
			  method: "POST",
			  data: JSON.stringify(argument)
		  });
    }
  };
});