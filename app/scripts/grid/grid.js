'use strict';

angular
	.module('Grid',[])
	.service('GridService', function(){
		var self = this;

		self.grid 	= [];
		self.tiles 	= [];

		// Size of board
		self.size 	= 4;
	});