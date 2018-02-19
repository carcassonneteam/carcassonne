(function ($, window) {
    var TILES_DIR = "assets/tiles";

    var Tile = function (name, edges) {
        this.name = name;
        this.edges = edges;
        this.$container = $("<div/>")
            .addClass("tile");
        this.$container.data('tile', this);

        this.neighbours = {
            n: null,
            e: null,
            s: null,
            w: null
        };
    };

    Tile.oppositeEdge = function (edge) {
        switch (edge) {
            case 'n':
                return 's';
            case 'e':
                return 'w';
            case 's':
                return 'n';
            case 'w':
                return 'e';
        }
    };

    var proto = {
        $container: null,
        name: null,
        edges: null,
        neighbours: null,
        rotation: 0,
        rotateRight: function() {
            this.rotation = (this.rotation + 90) % 360;

            var src = $.extend({}, this.edges);
            this.edges.n = src.w;
            this.edges.e = src.n;
            this.edges.s = src.e;
            this.edges.w = src.s;

            this.applyRotation();
        },
        rotateLeft: function() {
            this.rotation = (this.rotation + 270) % 360;

            var src = $.extend({}, this.edges);
            this.edges.n = src.e;
            this.edges.e = src.s;
            this.edges.s = src.w;
            this.edges.w = src.n;

            this.applyRotation();
        },
        applyRotation: function () {
            this.$container.find('img').rotate(this.rotation);
        },
        hasNeighbour: function (edge) {
            return this.neighbours[edge] !== null;
        },
        neighbourFits: function (edge, neighbour) {
            return neighbour.edges[Tile.oppositeEdge(edge)] === this.edges[edge];
        },
        addNeighbour: function (edge, neighbour) {
            if (this.hasNeighbour(edge)) {
                throw "Already has neighbour on edge: " + neighbour;
            }
            if (!this.neighbourFits(edge, neighbour)) {
                throw "Neighbour does not fit to the edge " + edge;
            }

            this.neighbours[edge] = neighbour;
        },
        clearNeighbours: function () {
            for (var edge in this.neighbours) {
                if (this.neighbours.hasOwnProperty(edge)) {
                    this.neighbours[edge] = null;
                }
            }
        },
        initDrag: function(onStart, onStop) {
            this.$container.draggable({
                revert: false,
                zIndex: 1000,
                helper: 'clone',
                appendTo: 'body',
                start: function(event, ui) {
                    $(this).hide();
                    if (onStart) {
                        var tile = $(this).data('tile');
                        onStart.call(this, tile);
                    }
                },
                stop: function(event, ui) {
                    $(this).show();
                    if (onStop) {
                        var tile = $(this).data('tile');
                        onStop.call(this, tile);
                    }
                }
            });
        },
        destroyDrag: function () {
            if (this.$container.data('uiDraggable')) {
                this.$container.draggable("destroy");
            }
        },
        draw: function (position) {
            this.$container.not(":has(img)").append($("<img/>")
                    .attr("src", TILES_DIR + "/" + this.name + ".png"));

            if (this.rotation > 0) {
                this.$container.find("img")
                    .addClass("rotate-" + this.rotation);
            }

            if (position) {
                this.$container.css({
                    left: position[0] + 'px',
                    top: position[1] + 'px'
                });
            }

            return this.$container;
        }
    };

    $.extend(Tile.prototype, proto);
    window.Tile = Tile;
})(jQuery, window);