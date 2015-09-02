define(["firebase"],function(_firebase) {
  return {
    delete: function(argument) {
      var ref = new Firebase("https://blistering-torch-3779.firebaseio.com" + argument);
      ref.remove();
    }
  };
});