requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"],function($, Handlebars, bootstrap, dom, populate, more) {
  populate.getSongs(function(songObject) {
    require(['hbs!../templates/songs'], function(template) {
      var populatedTemplate = template(songObject);
      dom.getOutputSection().html(populatedTemplate);
    });
  });
   

  $('#more').click(function(){
    more.getSongs(function(songObject) {
      require(['hbs!../templates/songs'], function(template) {
        var populatedTemplate = template(songObject);
        dom.getOutputSection().append(populatedTemplate);
      });
    });
  });

  $(document).on("click", '#delete', function() {
    console.log("you clicked the delete button");
    $(this).parent().remove();
  });

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