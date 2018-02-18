(function($, window) {
    var $container;

    var Board = function($cont) {
        $container = $cont;
        clear();
        init();
    };

    var clear = function() {
        $container.html('');
    };

    var init = function () {
        adjustSize();
        loadStartingTile();
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
        var startingTile = TileController.starting();
        $container.append(startingTile.draw(center()));
    };

    var center = function () {
        var cols = $container.innerWidth()/TileSize[0];
        var rows = $container.innerHeight()/TileSize[1];
        return [TileSize[0] * Math.floor(cols/2), TileSize[1] * Math.floor(rows/2)];
    };

    window.Board = Board;
})(jQuery, window);