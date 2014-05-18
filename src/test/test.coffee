assert = require 'assert'

Map = require '../Map'
Position = require '../Position'
Robot = require '../Robot'

describe 'Map', ->
	it 'width not greater than 50', ->
		map = new Map 100, 100
		assert.equal map.Width, 50
	it 'height not greater than 50', ->
		map = new Map 100, 100
		assert.equal map.Height, 50

describe 'Robot', ->
	map = new Map 10, 10
	
	it 'moves forwards north', ->
		position = new Position 5, 5, 'N'
		robot = new Robot map, position
		robot.MoveForwards()
		assert.equal 5, robot.Position.X
		assert.equal 6, robot.Position.Y
		assert.equal 'N', robot.Position.Direction

	it 'moves forwards east', ->
		position = new Position 5, 5, 'E'
		robot = new Robot map, position
		robot.MoveForwards()
		assert.equal 6, robot.Position.X
		assert.equal 5, robot.Position.Y
		assert.equal 'E', robot.Position.Direction

	it 'moves forwards south', ->
		position = new Position 5, 5, 'S'
		robot = new Robot map, position
		robot.MoveForwards()
		assert.equal 5, robot.Position.X
		assert.equal 4, robot.Position.Y
		assert.equal 'S', robot.Position.Direction

	it 'moves forwards west', ->
		position = new Position 5, 5, 'W'
		robot = new Robot map, position
		robot.MoveForwards()
		assert.equal 4, robot.Position.X
		assert.equal 5, robot.Position.Y
		assert.equal 'W', robot.Position.Direction

	it 'moves backwards north', ->
		position = new Position 5, 5, 'N'
		robot = new Robot map, position
		robot.MoveBackwards()
		assert.equal 5, robot.Position.X
		assert.equal 4, robot.Position.Y
		assert.equal 'N', robot.Position.Direction

	it 'moves backwards east', ->
		position = new Position 5, 5, 'E'
		robot = new Robot map, position
		robot.MoveBackwards()
		assert.equal 4, robot.Position.X
		assert.equal 5, robot.Position.Y
		assert.equal 'E', robot.Position.Direction

	it 'moves backwards south', ->
		position = new Position 5, 5, 'S'
		robot = new Robot map, position
		robot.MoveBackwards()
		assert.equal 5, robot.Position.X
		assert.equal 6, robot.Position.Y
		assert.equal 'S', robot.Position.Direction

	it 'moves backwards west', ->
		position = new Position 5, 5, 'W'
		robot = new Robot map, position
		robot.MoveBackwards()
		assert.equal 6, robot.Position.X
		assert.equal 5, robot.Position.Y
		assert.equal 'W', robot.Position.Direction

	it 'turns left', ->
		position = new Position 0, 0, 'N'
		robot = new Robot map, position
		robot.TurnLeft()
		assert.equal 0, robot.Position.X
		assert.equal 0, robot.Position.Y
		assert.equal 'W', robot.Position.Direction

	it 'turns right', ->
		position = new Position 0, 0, 'N'
		robot = new Robot map, position
		robot.TurnRight()
		assert.equal 0, robot.Position.X
		assert.equal 0, robot.Position.Y
		assert.equal 'E', robot.Position.Direction

	it 'gets lost when out of map bounds', ->
		position = new Position 0, 10, 'N'
		robot = new Robot map, position
		assert.throws robot.MoveForwards, Error, 'Lost'

	it 'ignores command when on scent', ->
		position = new Position 5, 10, 'N'
		robotOne = new Robot map, position
		robotTwo = new Robot map, position
		try
			robotOne.MoveForwards()
		catch e
			# should throw error, digest and continue

		robotTwo.MoveForwards()
		assert.equal 5, robotTwo.Position.X
		assert.equal 10, robotTwo.Position.Y
		assert.equal 'N', robotTwo.Position.Direction

