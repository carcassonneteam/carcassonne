EdgeType = {
    City: 1,
    Road: 2,
    Field: 3
};

TileSize = [100, 100];

Tiles = [
    {
        name: "City1n - rwe",
        edges: {
            n: EdgeType.City,
            e: EdgeType.Road,
            s: EdgeType.Field,
            w: EdgeType.Road
        }
    },
    {
        name: "City1n - rse",
        edges: {
            n: EdgeType.City,
            e: EdgeType.Road,
            s: EdgeType.Road,
            w: EdgeType.Field
        }
    },
    {
        name: "City1n - rsw",
        edges: {
            n: EdgeType.City,
            e: EdgeType.Field,
            s: EdgeType.Road,
            w: EdgeType.Road
        }
    },
    {
        name: "City1n - rswe",
        edges: {
            n: EdgeType.City,
            e: EdgeType.Road,
            s: EdgeType.Road,
            w: EdgeType.Road
        }
    },
    {
        name: "City1n",
        edges: {
            n: EdgeType.City,
            e: EdgeType.Field,
            s: EdgeType.Field,
            w: EdgeType.Field
        }
    },
    {
        name: "City2nw - rse",
        edges: {
            n: EdgeType.City,
            e: EdgeType.Road,
            s: EdgeType.Road,
            w: EdgeType.City
        }
    },
    {
        name: "City2nw(s) - rse",
        hasBadge: true,
        edges: {
            n: EdgeType.City,
            e: EdgeType.Road,
            s: EdgeType.Road,
            w: EdgeType.City
        }
    },
    {
        name: "City2nw(s)",
        hasBadge: true,
        edges: {
            n: EdgeType.City,
            e: EdgeType.Field,
            s: EdgeType.Field,
            w: EdgeType.City
        }
    },
    {
        name: "City2nw",
        hasBadge: false,
        edges: {
            n: EdgeType.City,
            e: EdgeType.Field,
            s: EdgeType.Field,
            w: EdgeType.City
        }
    },
    {
        name: "City2we(s)",
        hasBadge: true,
        edges: {
            n: EdgeType.Field,
            e: EdgeType.City,
            s: EdgeType.Field,
            w: EdgeType.City
        }
    },
    {
        name: "City2we",
        hasBadge: false,
        edges: {
            n: EdgeType.Field,
            e: EdgeType.City,
            s: EdgeType.Field,
            w: EdgeType.City
        }
    },
    {
        name: "City11ne",
        hasBadge: false,
        edges: {
            n: EdgeType.City,
            e: EdgeType.City,
            s: EdgeType.Field,
            w: EdgeType.Field
        }
    },
    {
        name: "City11we",
        hasBadge: false,
        edges: {
            n: EdgeType.Field,
            e: EdgeType.City,
            s: EdgeType.Field,
            w: EdgeType.City
        }
    },
    {
        name: "Road-ns",
        edges: {
            n: EdgeType.Road,
            e: EdgeType.Field,
            s: EdgeType.Road,
            w: EdgeType.Field
        }
    },
    {
        name: "Road-sw",
        edges: {
            n: EdgeType.Field,
            e: EdgeType.Field,
            s: EdgeType.Road,
            w: EdgeType.Road
        }
    },
    {
        name: "Road-swe",
        edges: {
            n: EdgeType.Field,
            e: EdgeType.Road,
            s: EdgeType.Road,
            w: EdgeType.Road
        }
    },
    {
        name: "Road-we",
        edges: {
            n: EdgeType.Field,
            e: EdgeType.Road,
            s: EdgeType.Field,
            w: EdgeType.Road
        }
    }
];