requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery' : '../bower_components/jquery/dist/jquery.min',
    'firebase' : '../bower_components/firebase/firebase',
    'hbs' : '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash' : '../bower_components/lodash/lodash.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'material': ['bootstrap'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["firebase", "jquery","lodash", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs", "add", "filterArtist"],
  function(_firebase, $, _, Handlebars, bootstrap, dom, populate, more, addSong, filterArtist) {

  var myFirebaseRef = new Firebase('https://blistering-torch-3779.firebaseio.com');
  allSongObject = {};
  allSongsArray = [];
  myFirebaseRef.child("songs").on("value", function(snapshot) {
    allSongObject = snapshot.val();
    // Convert Firebase's object of objects into an array of objects
    for (var key in allSongObject) {
      allSongsArray[allSongsArray.length] = allSongObject[key];
    }
    require(['hbs!../templates/songs'], function(template) {
      populatedTemplate = template(allSongsArray);
      //console.log("template(allSongsArray) : " + template(allSongsArray));
      dom.getOutputSection().html(populatedTemplate);
    });
  });

  
  //// song adding machine /////
  $("#addSong").click(function() {
    var newSong = {
    "title": $("#songName").val(),
    "artist": $("#artistName").val(),
    "album": $("#albumName").val(),
    };
    addSong.add(newSong);
    $("#songName").val('');
    $("#artistName").val('');
    $("#albumName").val('');
  });

  
   //// Filter item dropdowns /////  
  populate.getSongs(function(filterObject) {
    allSongObject = filterObject;
    require(['hbs!../templates/filter'], function(template) {
      var populatedTemplate2 = template(filterObject);
      $("#dropdowndiv").html(populatedTemplate2);
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

  var filteredAlbums = [];
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
  });
  
  $(document).on("click", '#delete', function() {
    var deleteTitle = $(this).siblings('h2').text();
    var titleKey = '';
    console.log('deleteTitle', deleteTitle);
    titleKey = _.findKey(allSongObject, { 'title': deleteTitle });  // will absolutely not work, lol ///
    console.log(titleKey);
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