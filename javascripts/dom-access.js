define(["jquery"],function($) {
  var $outputSection = $('#song1');
  return {
    getOutputSection: function () {
      console.log("The getter for chickensoup $outputSection");
      return $outputSection;
    }
  };
});