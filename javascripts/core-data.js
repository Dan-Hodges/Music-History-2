define(function(require) {
  var $ = require('jquery');
  var firebase = require("firebase");
  var _ = require("lodash");
  var addSong = require("add");
  var auth = require("authentication");
  var populate = require('get-more-songs');
  var deleter = require('delete');

  var allSongObject = {};
  var filteredAlbums = [];
  var filteredArtist = [];
  var allSongsArray = [];

  console.log("addSong :", addSong());

  var ref = new Firebase("https://blistering-torch-3779.firebaseio.com");
  var currentUser = auth.getUid();
  ref.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {
    allSongObject = snapshot.val();
    for (var key in allSongObject) {
      allSongsArray[allSongsArray.length] = allSongObject[key];
    }
    require(['hbs!../templates/songs'], function(template) {
      $('#song1').html(template(allSongsArray));
    });

    $(document).on('click', '#subbutton', function () {
      console.log("you clicked filter. " + "Your artist is : " + selectedArtist + " and your selected album is : " + selectedAlbum);
      // allSongObject
      for (var i = 0; i < allSongsArray.length; i++) {
        if (allSongsArray[i].artist === selectedArtist) {
          filteredAlbums.push(allSongsArray[i]);
        }
      }
      require(['hbs!../templates/songs'], function(template) {
        var populatedTemplate = template(filteredAlbums);
        dom.getOutputSection().html(populatedTemplate);
      });
      require(['hbs!../templates/filterAlbums'], function(template) {
        var populatedTemplate = template(filteredAlbums);
        $("#dropdowndiv").html(populatedTemplate);
      });
    });
  });


  //// song adding machine /////
  $("#addSong").click(function() {
    var newSong = {
    "title": $("#songName").val(),
    "artist": $("#artistName").val(),
    "album": $("#albumName").val(),
    "uid": auth.getUid(),
    };
    addSong(newSong);
    $("#songName").val('');
    $("#artistName").val('');
    $("#albumName").val('');
  });


  //// Filter item dropdowns /////  
  populate.getSongs(function(filterObject) {
    allSongObject = filterObject;
    // console.log("filterObject: ", filterObject);
    require(['hbs!../templates/filter'], function(template) {
      var populatedTemplate = template(filterObject);
      // console.log("populatedTemplate", populatedTemplate);
      $("#dropdowndiv").html(populatedTemplate);
    });
  });

  ///// filtering machine //////
  var selectedArtist = '', selectedAlbum = '';

  $(document).on('click', '.dropdown-menu li a#artist', function () {
    selectedArtist = $(this).text();
    selectedAlbum = '';
    console.log("selectedArtist", selectedArtist);
  });

  $(document).on('click', '.dropdown-menu li a#album', function () {
    selectedAlbum = $(this).text();
    console.log("selectedAlbum", selectedAlbum);
  });


  /// database delete machine ///
  $(document).on("click", '#delete', function() {
    var deleteTitle = $(this).siblings('h2').html();
    var titleKey = '';
    titleKey = _.findKey(allSongObject, {'title': deleteTitle});
    console.log(titleKey);
    deleter.delete(titleKey);
    $(this).parent().remove();
  });

    /// local remove machine ///
  $(document).on("click", '#remove', function() {
    $(this).parent().remove();
  });

  //// scrolling div machine /////
  $(document).ready(function() {
    var s = $("#sticker");
    var pos = s.position();  
    console.log("I Work says mr scroll function");                  
    $(window).scroll(function() {
      var windowpos = $(window).scrollTop();
      if (windowpos >= pos.top) {
        s.addClass("stick");
      } else {
        s.removeClass("stick"); 
      }
    });
  });

});  