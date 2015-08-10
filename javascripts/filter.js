define(function() {
  var newSongs = {
    artist: '',
    album: ''
  };
  return {
    getSongs: function(inputFunc, artistInput) {
      $.ajax({
        url: "https://blistering-torch-3779.firebaseio.com/.json"
      }).done(function(returnedValue) {
          for (var num in returnedValue) {
            console.log("artistInput", artistInput);
            if (returnedValue[num].artist === artistInput) {
              console.log("You have selected: ", returnedValue[num]);
              newSongs.artist = returnedValue[num].artist;
              console.log("newSongs.artist = ", newSongs.artist);
            }
        inputFunc(newSongs);
        }
      });
    }
  };
});