(function($, window) {
    var $container;
    var $tileContainer;
    var tiles = [];
    var dropZones = [];

    var Board = function($cont, $tileCont) {
        $container = $cont;
        $tileContainer = $tileCont;
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
        this.insert(TileController.starting());
    };

    var center = function () {
        var cols = $container.innerWidth()/TileSize[0];
        var rows = $container.innerHeight()/TileSize[1];
        return [TileSize[0] * Math.floor(cols/2), TileSize[1] * Math.floor(rows/2)];
    };

    var newDropZone = function (tile, edge) {
        var $dropZone = $('<div />')
            .addClass('drop-zone')
            .width(TileSize[0])
            .height(TileSize[1]);
        var position = [tile.$container.position().left, tile.$container.position().top];
        switch (edge) {
            case 'n':
                position[1] -= TileSize[1];
                break;
            case 'e':
                position[0] += TileSize[0];
                break;
            case 's':
                position[1] += TileSize[1];
                break;
            case 'w':
                position[0] -= TileSize[0];
                break;
        }

        $dropZone.css({
            left: position[0] + 'px',
            top: position[1] + 'px',
            position: 'absolute'
        });

        $dropZone.droppable({
            drop: function(event, ui) {
                ui.draggable.css({
                    left: $(this).position().left + 'px',
                    top:  $(this).position().top + 'px',
                    position: 'absolute'
                });

                ui.helper.hide();
                ui.draggable.show();
                $container.append(ui.draggable);

                var userTile = gameController.currentTurn().tile;
                makeTemporaryBound(userTile, $dropZone);
            },
            out: function(event, ui) {
                resetUserTile();
            },
            tolerance: 'intersect',
            hoverClass: 'active'
        });

        $dropZone.data({
            tile: tile,
            edge: edge
        });
        $dropZone.appendTo($container);
        dropZones.push($dropZone);

        return $dropZone;
    };

    var clearDropZone = function() {
        $(dropZones).each(function() {
            this.remove();
        });
        dropZones.splice(0, dropZones.length); //clear
    };

    var makeTemporaryBound = function (userTile, $dropZone) {
        var neighbourTile = $dropZone.data('tile');
        var edge = $dropZone.data('edge');
        userTile.clearNeighbours();
        userTile.addNeighbour(Tile.oppositeEdge(edge), neighbourTile);
    };

    var resetUserTile = function() {
        var $userTile = gameController.currentTurn().tile.draw();
        $userTile.css('position', 'static');
        $tileContainer.append($userTile);
    };

    var proto = {
        insert: function (tile) {
            tiles.push(tile);
            tile.destroyDrag();
            $container.append(tile.draw(center()));
        },
        activateDropZone: function () {
            var userTile = gameController.currentTurn().tile;
            $.each(tiles, function() {
                var tile = this;
                $.each(['n', 'e', 's', 'w'], function() {
                    var edge = this.toString();
                    if (!tile.hasNeighbour(edge) && tile.neighbourFits(edge, userTile)) {
                        newDropZone(tile, edge);
                    }
                });
            });
        },
        deactivateDropZone: function () {
            clearDropZone();
        },
        update: function () {
            var turn = gameController.currentTurn();
            this.resetUserTile();

            turn.tile.initDrag(function() {
                board.activateDropZone();
            }, function () {
                board.deactivateDropZone();
            });
        },
        resetUserTile: function () {
            resetUserTile();
        }
    };

    $.extend(Board.prototype, proto);
    window.Board = Board;
})(jQuery, window);