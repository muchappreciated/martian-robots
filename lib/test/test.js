(function() {
  var Map, Position, Robot, assert;

  assert = require('assert');

  Map = require('../Map');

  Position = require('../Position');

  Robot = require('../Robot');

  describe('Map', function() {
    it('width not greater than 50', function() {
      var map;
      map = new Map(100, 100);
      return assert.equal(map.Width, 50);
    });
    return it('height not greater than 50', function() {
      var map;
      map = new Map(100, 100);
      return assert.equal(map.Height, 50);
    });
  });

  describe('Robot', function() {
    var map;
    map = new Map(10, 10);
    it('moves forwards north', function() {
      var position, robot;
      position = new Position(5, 5, 'N');
      robot = new Robot(map, position);
      robot.MoveForwards();
      assert.equal(5, robot.Position.X);
      assert.equal(6, robot.Position.Y);
      return assert.equal('N', robot.Position.Direction);
    });
    it('moves forwards east', function() {
      var position, robot;
      position = new Position(5, 5, 'E');
      robot = new Robot(map, position);
      robot.MoveForwards();
      assert.equal(6, robot.Position.X);
      assert.equal(5, robot.Position.Y);
      return assert.equal('E', robot.Position.Direction);
    });
    it('moves forwards south', function() {
      var position, robot;
      position = new Position(5, 5, 'S');
      robot = new Robot(map, position);
      robot.MoveForwards();
      assert.equal(5, robot.Position.X);
      assert.equal(4, robot.Position.Y);
      return assert.equal('S', robot.Position.Direction);
    });
    it('moves forwards west', function() {
      var position, robot;
      position = new Position(5, 5, 'W');
      robot = new Robot(map, position);
      robot.MoveForwards();
      assert.equal(4, robot.Position.X);
      assert.equal(5, robot.Position.Y);
      return assert.equal('W', robot.Position.Direction);
    });
    it('moves backwards north', function() {
      var position, robot;
      position = new Position(5, 5, 'N');
      robot = new Robot(map, position);
      robot.MoveBackwards();
      assert.equal(5, robot.Position.X);
      assert.equal(4, robot.Position.Y);
      return assert.equal('N', robot.Position.Direction);
    });
    it('moves backwards east', function() {
      var position, robot;
      position = new Position(5, 5, 'E');
      robot = new Robot(map, position);
      robot.MoveBackwards();
      assert.equal(4, robot.Position.X);
      assert.equal(5, robot.Position.Y);
      return assert.equal('E', robot.Position.Direction);
    });
    it('moves backwards south', function() {
      var position, robot;
      position = new Position(5, 5, 'S');
      robot = new Robot(map, position);
      robot.MoveBackwards();
      assert.equal(5, robot.Position.X);
      assert.equal(6, robot.Position.Y);
      return assert.equal('S', robot.Position.Direction);
    });
    it('moves backwards west', function() {
      var position, robot;
      position = new Position(5, 5, 'W');
      robot = new Robot(map, position);
      robot.MoveBackwards();
      assert.equal(6, robot.Position.X);
      assert.equal(5, robot.Position.Y);
      return assert.equal('W', robot.Position.Direction);
    });
    it('turns left', function() {
      var position, robot;
      position = new Position(0, 0, 'N');
      robot = new Robot(map, position);
      robot.TurnLeft();
      assert.equal(0, robot.Position.X);
      assert.equal(0, robot.Position.Y);
      return assert.equal('W', robot.Position.Direction);
    });
    it('turns right', function() {
      var position, robot;
      position = new Position(0, 0, 'N');
      robot = new Robot(map, position);
      robot.TurnRight();
      assert.equal(0, robot.Position.X);
      assert.equal(0, robot.Position.Y);
      return assert.equal('E', robot.Position.Direction);
    });
    it('gets lost when out of map bounds', function() {
      var position, robot;
      position = new Position(0, 10, 'N');
      robot = new Robot(map, position);
      return assert.throws(robot.MoveForwards, Error, 'Lost');
    });
    return it('ignores command when on scent', function() {
      var e, position, robotOne, robotTwo;
      position = new Position(5, 10, 'N');
      robotOne = new Robot(map, position);
      robotTwo = new Robot(map, position);
      try {
        robotOne.MoveForwards();
      } catch (_error) {
        e = _error;
      }
      robotTwo.MoveForwards();
      assert.equal(5, robotTwo.Position.X);
      assert.equal(10, robotTwo.Position.Y);
      return assert.equal('N', robotTwo.Position.Direction);
    });
  });

  describe('Sample input', function() {
    var map;
    map = new Map(5, 3);
    return it('has correct output', function() {
      var e, robotOne, robotThree, robotTwo;
      robotOne = new Robot(map, new Position(1, 1, 'E'));
      robotTwo = new Robot(map, new Position(3, 2, 'N'));
      robotThree = new Robot(map, new Position(0, 3, 'W'));
      robotOne.TurnRight();
      robotOne.MoveForwards();
      robotOne.TurnRight();
      robotOne.MoveForwards();
      robotOne.TurnRight();
      robotOne.MoveForwards();
      robotOne.TurnRight();
      robotOne.MoveForwards();
      assert.equal(1, robotOne.Position.X);
      assert.equal(1, robotOne.Position.Y);
      assert.equal('E', robotOne.Position.Direction);
      try {
        robotTwo.MoveForwards();
        robotTwo.TurnRight();
        robotTwo.TurnRight();
        robotTwo.MoveForwards();
        robotTwo.TurnLeft();
        robotTwo.TurnLeft();
        robotTwo.MoveForwards();
        robotTwo.MoveForwards();
        robotTwo.TurnRight();
        robotTwo.TurnRight();
        robotTwo.MoveForwards();
        robotTwo.TurnLeft();
        robotTwo.TurnLeft();
      } catch (_error) {
        e = _error;
      }
      robotThree.TurnLeft();
      robotThree.TurnLeft();
      robotThree.MoveForwards();
      robotThree.MoveForwards();
      robotThree.MoveForwards();
      robotThree.TurnLeft();
      robotThree.MoveForwards();
      robotThree.TurnLeft();
      robotThree.MoveForwards();
      robotThree.TurnLeft();
      assert.equal(2, robotThree.Position.X);
      assert.equal(3, robotThree.Position.Y);
      return assert.equal('S', robotThree.Position.Direction);
    });
  });

}).call(this);
