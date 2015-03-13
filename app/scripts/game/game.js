'use strict';

angular
	.module('Game', [])
	.service('GameManager', function(){
	  
	  var self = this;

	  // Create a new game
	  self.newGame = function() {};

	  // Handle the move action
	  self.move = function() {};
	  
	  // Update the score
	  self.updateScore = function(newScore) {};
	  
	  // Are there moves left?
	  self.movesAvailable = function() {
	  	return GridService.anyCellsAvailable() || 
            GridService.tileMatchesAvailable();
	  };
	});