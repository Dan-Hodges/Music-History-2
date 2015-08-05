define(function() {
  return {
    getSongs: function(inputFunc, sentDom) {
      $.ajax({
        url: "data/ajaxtext.json"
      }).done(function(data) {
        console.log(data);
        inputFunc(data);
      });
    }
  };
});

