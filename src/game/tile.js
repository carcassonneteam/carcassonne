(function ($, window) {
    var TILES_DIR = "assets/tiles";

    var Tile = function (name, edges) {
        this.name = name;
        this.edges = edges;
        this.$container = $("<div/>")
            .addClass("tile");
        this.$container.data('tile', this);
    };

    var proto = {
        $container: null,
        name: null,
        edges: {
            n: null,
            e: null,
            s: null,
            w: null
        },
        neighbours: {
            n: null,
            e: null,
            s: null,
            w: null
        },
        rotation: 0,
        rotateRight: function() {
            this.rotation = (rotation + 90) % 360;

            var src = $.extend({}, this.edges);
            this.edges.n = src.w;
            this.edges.e = src.n;
            this.edges.s = src.w;
            this.edges.w = src.s;
        },
        getRotation: function () {
            return this.rotation;
        },
        hasNeighbour: function (edge) {
            return this.edges[edge] != null;
        },
        neighbourFits: function (edge, neighbour) {
            return neighbour[edge] === this.edges[edge];
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
        initDrag: function() {
            //TODO: draggable
        },
        draw: function () {
            if (!this.$container.has("img")) {
                this.$container.append($("<img/>")
                    .attr("src", TILES_DIR + "/" + name + ".png"))
            }

            if (this.rotation > 0) {
                this.$container.find("img")
                    .addClass("rotate-" + this.rotation);
            }

            return this.$container;
        }
    };

    $.extend(Tile.prototype, proto);
    window.Tile = Tile;
})(jQuery, window);