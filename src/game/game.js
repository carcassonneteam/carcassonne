(function($, window) {

	var players = [];

	window.Game = function() {
		window.gameController = this;
		players = [];
	};

	window.Game.prototype.showScreen = function(screen) {
		$("#game").load('screens/' + screen + ".html", function() {
		    setTimeout(function () {
                $(window).trigger('load');
            }, 100);
        });
	};

	window.Game.prototype.addPlayer = function(player) {
		players.push(player);
	};

	window.Game.prototype.getPlayers = function() {
		return players;
	};

	window.Game.prototype.getPlayer = function(num) {
		return players[num];
	}

})(jQuery, window);