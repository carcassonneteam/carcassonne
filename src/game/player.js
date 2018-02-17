(function($, window) {

	

	window.Player = function(name, color) {
		this.name = name;
		this.color = color;
		this.points = 0;
	};

	window.Player.prototype.name;
	window.Player.prototype.color;
	window.Player.prototype.points;

	window.Player.colors = [
		"red",
		"blue",
		"green",
		"yellow",
		"black"
	];

})(jQuery, window);