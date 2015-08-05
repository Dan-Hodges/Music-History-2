define(function() {
  return {
    getSongs: function(inputFunc, sentDom) {
      $.ajax({
        url: "data/list2.json"
      }).done(function(data) {
        console.log(data);
        inputFunc(data);
      });
    }  
  };
});