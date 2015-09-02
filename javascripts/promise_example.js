  var first_list_of_songs = getSongs();

  first_list_of_songs
    .then(function(first_songs){
      for (var i = 0; i < first_songs.songs.length; i++) {
        all_songs.push(first_songs.songs[i]);
      };

      return getMoreSongs();
    })
    .then(function(second_songs) {
      second_songs.songs.forEach(function(song) {
        all_songs.push(song);
      });   
    })
    .fail
    .done(function () {
      console.log("all_songs :", all_songs);
    });
console.log(first_list_of_songs);