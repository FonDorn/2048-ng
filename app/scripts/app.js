'use strict';

angular
  .module('twentyfourtyeightApp', [
    'Game'
  ])
  .controller('GameController', function(GameManager){
  		var self = this;

  		self.game = GameManager;
  });
