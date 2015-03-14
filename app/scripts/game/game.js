'use strict';

angular
	.module('Game', [])
	.service('GameManager', function(GridService){
	  
	  var self = this;

	  // Create a new game
	  self.newGame = function() {
	  	GridService.buildEmptyGameBoard();
	    GridService.buildStartingPosition();
	    this.reinit();
	  };

	  // Handle the move action
	  this.move = function(key) {
		  var self = this;
		  var hasWon = false;
		  var hasMoved = false;

		  // define move here
		  if (self.win) { return false; }
		  var positions = GridService.traversalDirections(key);

		  positions.x.forEach(function(x) {
		    positions.y.forEach(function(y) {
		      // For every position
		      // save the tile's original position
				var originalPosition = {x:x,y:y};
				var tile = GridService.getCellAt(originalPosition);

				if (tile) {
				  // if we have a tile here
				  var 	cell = GridService.calculateNextPosition(tile, key),
				  		next = cell.next;

					  if (next &&
					      next.value === tile.value &&
					      !next.merged) {
					    // Handle merged
						var newValue = tile.value * 2;
						// Create a new tile
						var mergedTile = GridService.newTile(tile, newValue);
						mergedTile.merged = [tile, cell.next];
						// Insert the new tile
						GridService.insertTile(mergedTile);
						// Remove the old tile
						GridService.removeTile(tile);
						// Move the location of the mergedTile into the next position
						GridService.moveTile(merged, next);
						// Update the score of the game
						self.updateScore(self.currentScore + newValue);
						// Check for the winning value
						if (merged.value >= self.winningValue) {
						  hasWon = true;
						}
						hasMoved = true; // we moved with a merge
					  } else {
					    GridService.moveTile(tile, cell.newPosition);
					  }

					  if (!GridService.samePositions(originalPos, cell.newPosition)) {
						  hasMoved = true;
						}

						if (hasMoved) {
						  GridService.randomlyInsertNewTile();

						  if (self.win || !self.movesAvailable()) {
						    self.gameOver = true;
						  }
						}

				}
		    });
		  });
		};
	  
	  // Update the score
	  self.updateScore = function(newScore) {};
	  
	  // Are there moves left?
	  self.movesAvailable = function() {
	  	return GridService.anyCellsAvailable() || 
            GridService.tileMatchesAvailable();
	  };

		// Reset game state
	  self.reinit = function() {
	    this.gameOver = false;
	    this.win = false;
	    this.currentScore = 0;
	    this.highScore = 0; // we'll come back to this
	  };

	});