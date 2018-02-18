(function($, window) {

	var players = [];

	var turn = {
	    playerNum: -1,
        tile: null,
        tileInserted: false
    }

	window.Game = function() {
		window.gameController = this;
		players = [];
		TileController.init();
	};

	window.Game.prototype.showScreen = function(screen) {
		$("#game").load('screens/' + screen + ".html");
	};

	window.Game.prototype.addPlayer = function(player) {
		players.push(player);
	};

	window.Game.prototype.getPlayers = function() {
		return players;
	};

	window.Game.prototype.getActivePlayer = function() {
		return players[turn.playerNum];
	};

	window.Game.prototype.firstTurn = function() {
        return this.nextTurn();
    };

	window.Game.prototype.nextTurn = function() {
        turn.playerNum = (turn.playerNum + 1) % players.length;
        turn.tile = TileController.random();
        return $.extend({}, turn);
    };

})(jQuery, window);