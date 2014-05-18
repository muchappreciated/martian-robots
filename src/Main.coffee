readLine = require 'readline'

Map = require './Map'
Position = require './Position'
Robot = require './Robot'

rl = readLine.createInterface process.stdin, process.stdout

map = null
position = null
robot = null

# Set initial map size bounding
rl.question "Map size: ", (mapSize) ->
	mapSize = mapSize.trim()
	mapSizeArr = mapSize.split " "
	map = new Map mapSizeArr[0], mapSizeArr[1]
	# Set starting position and direction
	rl.question "Start position: ", (robotInit) ->
		robotInit = robotInit.trim()
		robotInitArr = robotInit.split " "
		position = new Position robotInitArr[0], robotInitArr[1], robotInitArr[2]
		robot = new Robot map, position

rl.on 'line', (line) ->
	ProcessInput line, ->
		if robot.IsLost
			console.log "#{position.X} #{position.Y} #{position.Direction} LOST"
		else
			console.log "#{position.X} #{position.Y} #{position.Direction}"
		rl.question "Start position: ", (robotInit) ->
			robotInit = robotInit.trim()
			robotInitArr = robotInit.split " "
			position = new Position robotInitArr[0], robotInitArr[1], robotInitArr[2]
			robot = new Robot map, position

ProcessInput = (line, callback) ->
	line = line.toUpperCase().substring 0, 100 #use first 100
	inputArr = line.split ""
	for command in inputArr
		try
			Move command
		catch e
			robot.IsLost = true
			break
	callback()

Move = (command) ->
	switch command
		when "F" then robot.MoveForwards()
		when "B" then robot.MoveBackwards()
		when "L" then robot.TurnLeft()
		when "R" then robot.TurnRight()

	