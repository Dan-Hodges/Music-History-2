define(function() {
  return {
    getSongs: function(inputFunc) {
      $.ajax({
        url: "https://blistering-torch-3779.firebaseio.com/.json"
      }).done(function(data) {
        console.log(data);
        inputFunc(data);
      });
    }
  };
});

