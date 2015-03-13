describe('Game module', function() {
  describe('GameManager', function() {
    // Inject the Game module into this test
    beforeEach(module('Game'));

    var gameManager; // instance of the GameManager
	  beforeEach(inject(function(GameManager) {
	    gameManager = GameManager;
	  });
  });
});