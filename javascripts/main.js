requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery' : '../bower_components/jquery/dist/jquery.min',
    'firebase' : '../bower_components/firebase/firebase',
    'hbs' : '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash' : '../bower_components/lodash/lodash.min',
    'q' : '../bower_components/q/q',
    'es6': '../bower_components/requirejs-babel/es6',
    'babel': '../bower_components/requirejs-babel/babel-5.8.22.min'
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
  ["es6!dependencies", "dom-access", "core-data",
   "populate-songs", "get-more-songs", "add", "filterArtist", "delete", "authentication"],
  function(dom, core,
   populate, more, addSong, filterArtist, deleter, auth) {

  var myFirebaseRef = new Firebase('https://blistering-torch-3779.firebaseio.com');
  var authData = myFirebaseRef.getAuth();
  console.log("authData :", authData);


  var ref = new Firebase("https://blistering-torch-3779.firebaseio.com");

  if (authData === null) {
    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        auth.setUid(authData.uid);
        require(["core-data"], function(){});
      }
    });
  } 
  else {
    auth.setUid(authData.uid);
  }  
});