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
	  self.move = function() {};
	  
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