(function() {
  var Map, Move, Position, ProcessInput, Robot, map, position, readLine, rl, robot;

  readLine = require('readline');

  Map = require('./Map');

  Position = require('./Position');

  Robot = require('./Robot');

  rl = readLine.createInterface(process.stdin, process.stdout);

  map = null;

  position = null;

  robot = null;

  rl.question("Map size: ", function(mapSize) {
    var mapSizeArr;
    mapSize = mapSize.trim();
    mapSizeArr = mapSize.split(" ");
    map = new Map(mapSizeArr[0], mapSizeArr[1]);
    return rl.question("Start position: ", function(robotInit) {
      var robotInitArr;
      robotInit = robotInit.trim();
      robotInitArr = robotInit.split(" ");
      position = new Position(robotInitArr[0], robotInitArr[1], robotInitArr[2]);
      return robot = new Robot(map, position);
    });
  });

  rl.on('line', function(line) {
    return ProcessInput(line, function() {
      if (robot.IsLost) {
        console.log("" + position.X + " " + position.Y + " " + position.Direction + " LOST");
      } else {
        console.log("" + position.X + " " + position.Y + " " + position.Direction);
      }
      return rl.question("Start position: ", function(robotInit) {
        var robotInitArr;
        robotInit = robotInit.trim();
        robotInitArr = robotInit.split(" ");
        position = new Position(robotInitArr[0], robotInitArr[1], robotInitArr[2]);
        return robot = new Robot(map, position);
      });
    });
  });

  ProcessInput = function(line, callback) {
    var command, e, inputArr, _i, _len;
    line = line.toUpperCase().substring(0, 100);
    inputArr = line.split("");
    for (_i = 0, _len = inputArr.length; _i < _len; _i++) {
      command = inputArr[_i];
      try {
        Move(command);
      } catch (_error) {
        e = _error;
        robot.IsLost = true;
        break;
      }
    }
    return callback();
  };

  Move = function(command) {
    switch (command) {
      case "F":
        return robot.MoveForwards();
      case "B":
        return robot.MoveBackwards();
      case "L":
        return robot.TurnLeft();
      case "R":
        return robot.TurnRight();
    }
  };

}).call(this);
