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
        var borderSize = 0;//$container.outerWidth() - $container.innerWidth();

        $container.width(borderSize + width - width % TileSize[0]);

        height -= $container.position().top;
        $container.height(borderSize + height - height % TileSize[1]);
    };

    var expandBoard = function () {
        var expand = [false, false, false, false];
        var width = $container.innerWidth();
        var height = $container.innerHeight();
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            var pos = elPos(tile.$container);

            if (!expand[0] && pos[0] === 0) {
                expand[0] = true;
            }
            if (!expand[1] && pos[1] === 0) {
                expand[1] = true;
            }
            if (!expand[2] && pos[1] + (expand[1] ? 2 * TileSize[1] : TileSize[1]) >= height) {
                expand[2] = true;
            }
            if (!expand[3] && pos[0] + (expand[0] ? 2 * TileSize[0] : TileSize[0]) >= width) {
                expand[3] = true;
            }

            if (expand[0] && expand[1] && expand[2] && expand[3]) {
                break;
            }
        }

        if (expand[0] || expand[1]) {
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                var pos = elPos(tile.$container);

                tile.$container.css({
                    left: (expand[0] ? pos[0] + TileSize[0] : pos[0]) + 'px',
                    top:  (expand[1] ? pos[1] + TileSize[1] : pos[1]) + 'px'
                });
            }
        }

        if (expand[2]) {
            $container.height(height + TileSize[1]);
        }
        if (expand[3]) {
            $container.width(width + TileSize[0]);
        }
    };

    var loadStartingTile = function() {
        this.insert(TileController.starting());
    };

    var center = function () {
        var cols = $container.innerWidth()/TileSize[0];
        var rows = $container.innerHeight()/TileSize[1];
        return [TileSize[0] * Math.floor(cols/2), TileSize[1] * Math.floor(rows/2)];
    };

    var newDropZonePosition = function (tile, edge) {
        var position = elPos(tile.$container);
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
        return position;
    };

    var elPos = function($element) {
        return [parseInt($element.css('left')),  parseInt($element.css('top'))];
    };

    var newDropZone = function (tile, edge, position) {
        var $dropZone = $('<div />')
            .addClass('drop-zone')
            .width(TileSize[0])
            .height(TileSize[1]);

        $dropZone.css({
            left: position[0] + 'px',
            top: position[1] + 'px',
            position: 'absolute'
        });

        $dropZone.droppable({
            drop: function(event, ui) {
                var pos = elPos($(this));

                ui.draggable.css({
                    left: pos[0] + 'px',
                    top:  pos[1] + 'px',
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

        dropZones.push($dropZone);
        $dropZone.appendTo($container);
    };

    var validateDropZonePosition = function (position) {
        var userTile = gameController.currentTurn().tile;

        var northPos = [position[0]              , position[1] - TileSize[1]];
        var eastPos  = [position[0] + TileSize[0], position[1]];
        var southPos = [position[0]              , position[1] + TileSize[1]];
        var westPos  = [position[0] - TileSize[0], position[1]];

        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            var tilePos = elPos(tile.$container);

            if (tilePos[0] === northPos[0] && tilePos[1] === northPos[1] && !userTile.neighbourFits('n', tile)) {
                return false;
            }
            if (tilePos[0] === eastPos[0] && tilePos[1] === eastPos[1] && !userTile.neighbourFits('e', tile)) {
                return false;
            }
            if (tilePos[0] === southPos[0] && tilePos[1] === southPos[1] && !userTile.neighbourFits('s', tile)) {
                return false;
            }
            if (tilePos[0] === westPos[0] && tilePos[1] === westPos[1] && !userTile.neighbourFits('w', tile)) {
                return false;
            }
        }

        return true;
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
        userTile.removeNeighbour(edge);
        userTile.addNeighbour(Tile.oppositeEdge(edge), neighbourTile);
    };

    var resetUserTile = function() {
        var tile = gameController.currentTurn().tile;
        var $userTile = tile.draw();

        tile.clearNeighbours();
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
                        var dropZonePosition = newDropZonePosition(tile, edge);
                        if (validateDropZonePosition(dropZonePosition)) {
                            newDropZone(tile, edge, dropZonePosition);
                        }
                    }
                });
            });
        },
        deactivateDropZone: function () {
            clearDropZone();
        },
        update: function () {
            var turn = gameController.currentTurn();
            if (!turn) {
                return;
            }

            this.resetUserTile();

            turn.tile.initDrag(function() {
                board.activateDropZone();
            }, function () {
                board.deactivateDropZone();
            });
        },
        resetUserTile: function () {
            resetUserTile();
        },
        commitTile: function () {
            var userTile = gameController.currentTurn().tile;
            var hasNeighbour = false;

            $(['n', 'e', 's', 'w']).each(function() {
                var edge = this.toString();
                if (userTile.hasNeighbour(edge)) {
                    hasNeighbour = true;
                    var neighbour = userTile.getNeighbour(edge);
                    neighbour.addNeighbour(Tile.oppositeEdge(edge), userTile);
                }
            });

            if (hasNeighbour) {
                tiles.push(userTile);
                expandBoard();
            }

            return hasNeighbour;
        }
    };

    $.extend(Board.prototype, proto);
    window.Board = Board;
})(jQuery, window);