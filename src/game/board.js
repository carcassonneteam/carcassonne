(function($, window) {
    var $container;
    var tiles;

    var Board = function($cont) {
        $container = $cont;
        clear();
        init.call(this);
    };

    var clear = function() {
        tiles = [];
        $container.html('');
    };

    var init = function () {
        adjustSize();
        loadStartingTile.call(this);
    };

    var adjustSize = function () {
        var width = $container.width();
        var height = $container.height();
        var borderSize = $container.outerWidth() - $container.innerWidth();

        $container.width(borderSize + width - width % TileSize[0]);

        height -= $container.position().top;
        $container.height(borderSize + height - height % TileSize[1]);
    };

    var loadStartingTile = function() {
        this.add(TileController.starting())
    };

    var center = function () {
        var cols = $container.innerWidth()/TileSize[0];
        var rows = $container.innerHeight()/TileSize[1];
        return [TileSize[0] * Math.floor(cols/2), TileSize[1] * Math.floor(rows/2)];
    };

    var proto = {
        add: function(tile) {
            tiles.push(tile);
            tile.destroyDrag();
            $container.append(tile.draw(center()));
        }
    };

    $.extend(Board.prototype, proto);
    window.Board = Board;
})(jQuery, window);