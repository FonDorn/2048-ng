'use strict';

angular
	.module('Grid',[])
	.factory('TileModel', function(){
		var Tile = function(pos, val){
			var self = this;

			self.x 		= pos.x;
			self.y 		= pos.y;
			self.value 	= val || 2;
		};

		return Tile;
	})
	.service('GridService', function(TileModel){
		var self = this;

		self.startingTileNumber = 2;

		self.grid 	= [];
		self.tiles 	= [];

		self.tiles.push(new TileModel({x:1, y:1}, 2));
		self.tiles.push(new TileModel({x:1, y:2}, 2));

		// Size of board
		self.size 	= 4;

		self.buildEmptyGameBoard = function() {
		    var self = this;
		    // Initialize our grid
		    for (var x = 0; x < this.size * this.size; x++) {
		      this.grid[x] = null;
		    }

		    // Initialize our tile array
		    // with a bunch of null objects
		    this.forEach(function(x,y) {
		      self.setCellAt({x:x,y:y}, null);
		    });
		};

		// Run a method for each element in the tiles array
		self.forEach = function(cb) {
		  var totalSize = this.size * this.size;
		  for (var i = 0; i < totalSize; i++) {
		    var pos = this._positionToCoordinates(i);
		    cb(pos.x, pos.y, this.tiles[i]);
		  }
		};

		// Set a cell at position
		self.setCellAt = function(pos, tile) {
		  if (this.withinGrid(pos)) {
		    var xPos = this._coordinatesToPosition(pos);
		    this.tiles[xPos] = tile;
		  }
		};

		// Fetch a cell at a given position
		self.getCellAt = function(pos) {
		  if (this.withinGrid(pos)) {
		    var x = this._coordinatesToPosition(pos);
		    return this.tiles[x];
		  } else {
		    return null;
		  }
		};

		// A small helper function to determine if a position is
		// within the boundaries of our grid
		self.withinGrid = function(cell) {
		  return cell.x >= 0 && cell.x < this.size &&
		          cell.y >= 0 && cell.y < this.size;
		};

		// Helper to convert x to x,y
		self._positionToCoordinates = function(i) {
		  var x = i % this.size,
		      y = (i - x) / this.size;
		  return {
		    x: x,
		    y: y
		  };
		};

		// Helper to convert coordinates to position
		self._coordinatesToPosition = function(pos) {
		  return (pos.y * this.size) + pos.x;
		};

		self.buildStartingPosition = function() {
		    for (var x = 0; x < this.startingTileNumber; x++) {
		      this.randomlyInsertNewTile();
		    }
		};

		// Get all the available tiles
		self.availableCells = function() {
		    var cells = [],
		        self = this;

		    this.forEach(function(x,y) {
		      var foundTile = self.getCellAt({x:x, y:y});
		      if (!foundTile) {
		        cells.push({x:x,y:y});
		      }
		    });

		    return cells;
		};

		self.randomAvailableCell = function() {
		    var cells = this.availableCells();
		    if (cells.length > 0) {
		      return cells[Math.floor(Math.random() * cells.length)];
		    }
		};

		self.randomlyInsertNewTile = function() {
		    var cell = this.randomAvailableCell(),
		        tile = new TileModel(cell, 2);
		    this.insertTile(tile);
		};

		  // Add a tile to the tiles array
		self.insertTile = function(tile) {
		    var pos = this._coordinatesToPosition(tile);
		    this.tiles[pos] = tile;
		};

		  // Remove a tile from the tiles array
		self.removeTile = function(tile) {
		    var pos = this._coordinatesToPosition(tile);
		    delete this.tiles[pos];
		};

	});