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
        loadTiles();
    };

    var loadTiles = function() {

    };

    window.Board = Board;
})(jQuery, window);