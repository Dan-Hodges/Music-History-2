define(function() {
  return {
    getSongs: function(inputFunc) {
      $.ajax({
        url: "data/ajaxtext.json"
      }).done(function(data) {
        console.log(data);
        inputFunc(data);
      });
    }
  };
});

