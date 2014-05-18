(function() {
  var Map;

  module.exports = Map = (function() {
    function Map(width, height) {
      if (width > 50) {
        this.Width = 50;
      } else {
        this.Width = width;
      }
      if (height > 50) {
        this.Height = 50;
      } else {
        this.Height = height;
      }
      this.Scents = [];
    }

    return Map;

  })();

}).call(this);
