define(function() {
  filterArtist = [];
  return {
    getSongs: function(inputFunc, inputVariable) {
      $.ajax({
        url: "https://blistering-torch-3779.firebaseio.com/.json"
      }).done(function(data) {
        if (inputVariable === data.artist) {
          console.log(data.artist);
          filterArtist.push(data.artist);
        }
        inputFunc(filterArtist);
      });
    }
  };
});