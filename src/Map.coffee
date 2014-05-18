module.exports =
	class Map
		constructor: (width, height) ->
			if width > 50
				@Width = 50
			else
				@Width = width

			if height > 50
				@Height = 50
			else
				@Height = height
				
			@Scents = [] # Array of positions