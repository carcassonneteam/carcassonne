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
            startingTile = this.removeAndGet(0);
        },
        removeAndGet: function (index) {
            return tiles.splice(index, 1)[0];
        },
        starting: function () {
            return $.extend({}, startingTile);
        }, random: function () {
            var index = Math.floor(Math.random()*tiles.length);
            return this.removeAndGet(index);
        },
        getTiles: function () {
            return tiles;
        }
    };

    $.extend(TileController, public);
    window.TileController = TileController;
})(jQuery, window);