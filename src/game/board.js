(function($, window) {
    var $container;
    var tiles = [];
    var dropZones = [];

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
                ui.draggable.data('src-parent', ui.draggable.parent()[0]);
                $container.append(ui.draggable);

                makeTemporaryBound(ui.draggable, $dropZone);
            },
            out: function(event, ui) {
                ui.draggable.css('position', 'static');
                ui.draggable.appendTo($(ui.draggable.data('src-parent')));
            },
            tolerance: 'intersect',
            hoverClass: 'active'
        });

        $dropZone.data('tile', tile);
        $dropZone.data('edge', edge);
        $dropZone.appendTo($container);
        dropZones.push($dropZone);
    };

    var clearDropZone = function() {
        $(dropZones).each(function() {
            this.remove();
        });
        dropZones.splice(0, dropZones.length); //clear
    };

    var makeTemporaryBound = function (draggable, $dropZone) {
        var userTile = draggable.data('tile');
        var neighbourTile = $dropZone.data('tile');
        var edge = $dropZone.data('edge');
        userTile.clearNeighbours();
        userTile.addNeighbour(Tile.oppositeEdge(edge), neighbourTile);
    }

    var proto = {
        insert: function (tile) {
            tiles.push(tile);
            tile.destroyDrag();
            $container.append(tile.draw(center()));
        },
        activateDropZone: function (userTile) {
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
        }

    };

    $.extend(Board.prototype, proto);
    window.Board = Board;
})(jQuery, window);