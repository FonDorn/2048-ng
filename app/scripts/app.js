'use strict';

angular
  .module('twentyfourtyeightApp', [
    'Grid',
    'Game',
    'Keyboard'
  ])
  .controller('GameController', function(GameManager, KeyboardService){
  		var self = this;

  		self.game = GameManager;

  		// Create a new game
		self.newGame = function() {
		    KeyboardService.init();
		    this.game.newGame();
		    this.startGame();
		};

		self.startGame = function() {
		    var self = this;
		    KeyboardService.on(function(key) {
		      self.game.move(key);
		    });
	  	};

	  	// Create a new game on boot
  		this.newGame();
  });
