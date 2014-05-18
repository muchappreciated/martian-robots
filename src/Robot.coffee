Position = require './Position'

module.exports =
	class Robot
		constructor: (@Map, @Position) ->
			@IsLost = false

		MoveForwards: ->
			switch @Position.Direction
				when "N"
					if @Position.Y + 1 > @Map.Height then Lost(@Map, @Position) else @Position.Y++ 
				when "E"
					if @Position.X + 1 > @Map.Height then Lost(@Map, @Position) else @Position.X++
				when "S"
					if @Position.Y - 1 < 0 then Lost(@Map, @Position) else @Position.Y--
				when "W"
					if @Position.X - 1 < 0 then Lost(@Map, @Position) else @Position.X--

		MoveBackwards: ->
			switch @Position.Direction
				when "N"
					if @Position.Y - 1 < 0 then Lost(@Map, @Position) else @Position.Y--
				when "E"
					if @Position.X - 1 < 0 then Lost(@Map, @Position) else @Position.X--
				when "S"
					if @Position.Y + 1 > @Map.Height then Lost(@Map, @Position) else @Position.Y++
				when "W"
					if @Position.X + 1 > @Map.Width then Lost(@Map, @Position) else @Position.X++

		TurnLeft: ->
			switch @Position.Direction
				when "N" then @Position.Direction = "W"
				when "E" then @Position.Direction = "N"
				when "S" then @Position.Direction = "E"
				when "W" then @Position.Direction = "S"

		TurnRight: ->
			switch @Position.Direction
				when "N" then @Position.Direction = "E"
				when "E" then @Position.Direction = "S"
				when "S" then @Position.Direction = "W"
				when "W" then @Position.Direction = "N"

		Lost = (map, position) ->
			# Ignore command if scent on position
			hasScent = false
			for scent in map.Scents
				if position.Y.toString() is scent.Y.toString() and position.X.toString() is scent.X.toString()
					hasScent = true
					break
			if !hasScent
				map.Scents.push new Position position.X, position.Y, position.Direction
				throw new Error "Lost"
