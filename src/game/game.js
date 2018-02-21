(function($, window) {

	var players = [];

	var turn;

	window.Game = function() {
		window.gameController = this;
		players = [];
	};

	window.Game.prototype.showScreen = function(screen) {
		$("#game").load('screens/' + screen + ".html?t=" + new Date().getTime());
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

	window.Game.prototype.begin = function() {
        TileController.init();
    };

	window.Game.prototype.initFirstTurn = function() {
        turn = {
            playerNum: -1,
            tile: null
        }
    };

	window.Game.prototype.firstTurn = function() {
	    this.initFirstTurn();
        return this.nextTurn();
    };

	window.Game.prototype.nextTurn = function() {
        var tile = TileController.random();
        if (!tile) {
            turn = null;
            this.endGame();
        } else {
            turn.playerNum = (turn.playerNum + 1) % players.length;
            turn.tile = tile;
        }

        return turn;
    };

	window.Game.prototype.currentTurn = function() {
	    return turn;
    };

    window.Game.prototype.endGame = function() {
        var msg = "Gra została zakończona.\nWyniki:\n";

        //random points
        //TODO: implement point counting
        $.each(players, function() {
            this.points = Math.ceil((Math.random() * 100) + 1);
        });

        var sorted = players.sort(function(player, other) {
            return other.points - player.points;
        });
        $.each(sorted, function (pos) {
            msg += "\t" + (pos + 1) + ". " + this.name + ",  liczba punktów: " + this.points + "\n";
        });

        alert(msg);
        players = [];
        this.showScreen('main');
    };

})(jQuery, window);