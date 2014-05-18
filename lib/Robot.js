(function() {
  var Position, Robot;

  Position = require('./Position');

  module.exports = Robot = (function() {
    var Lost;

    function Robot(Map, Position) {
      this.Map = Map;
      this.Position = Position;
      this.IsLost = false;
    }

    Robot.prototype.MoveForwards = function() {
      switch (this.Position.Direction) {
        case "N":
          if (this.Position.Y + 1 > this.Map.Height) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.Y++;
          }
          break;
        case "E":
          if (this.Position.X + 1 > this.Map.Height) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.X++;
          }
          break;
        case "S":
          if (this.Position.Y - 1 < 0) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.Y--;
          }
          break;
        case "W":
          if (this.Position.X - 1 < 0) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.X--;
          }
      }
    };

    Robot.prototype.MoveBackwards = function() {
      switch (this.Position.Direction) {
        case "N":
          if (this.Position.Y - 1 < 0) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.Y--;
          }
          break;
        case "E":
          if (this.Position.X - 1 < 0) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.X--;
          }
          break;
        case "S":
          if (this.Position.Y + 1 > this.Map.Height) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.Y++;
          }
          break;
        case "W":
          if (this.Position.X + 1 > this.Map.Width) {
            return Lost(this.Map, this.Position);
          } else {
            return this.Position.X++;
          }
      }
    };

    Robot.prototype.TurnLeft = function() {
      switch (this.Position.Direction) {
        case "N":
          return this.Position.Direction = "W";
        case "E":
          return this.Position.Direction = "N";
        case "S":
          return this.Position.Direction = "E";
        case "W":
          return this.Position.Direction = "S";
      }
    };

    Robot.prototype.TurnRight = function() {
      switch (this.Position.Direction) {
        case "N":
          return this.Position.Direction = "E";
        case "E":
          return this.Position.Direction = "S";
        case "S":
          return this.Position.Direction = "W";
        case "W":
          return this.Position.Direction = "N";
      }
    };

    Lost = function(map, position) {
      var hasScent, scent, _i, _len, _ref;
      hasScent = false;
      _ref = map.Scents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        scent = _ref[_i];
        if (position.Y.toString() === scent.Y.toString() && position.X.toString() === scent.X.toString()) {
          hasScent = true;
          break;
        }
      }
      if (!hasScent) {
        map.Scents.push(new Position(position.X, position.Y, position.Direction));
        throw new Error("Lost");
      }
    };

    return Robot;

  })();

}).call(this);
