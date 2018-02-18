(function ($, window) {

    var TileController = {};

    var tiles;
    var startingTile;

    var public = {
        init: function() {
            tiles = [];
            $.each(window.Tiles, function() {
                tiles.push($.extend({}, new Tile(this.name, this.edges))); //copy tiles from DB
            });
            startingTile = tiles.splice(0, 1)[0];
        },
        starting: function () {
            console.log(startingTile);
            return $.extend({}, startingTile);
        },
        random: function () {
            var index = Math.floor(Math.random()*tiles.length);
            return tiles.splice(index, 1)[0];
        }
    };

    $.extend(TileController, public);
    window.TileController = TileController;
})(jQuery, window);