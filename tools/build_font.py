"""Build the original Zebes Relay webfonts. Install fonttools, brotli and shapely to rebuild."""
from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from shapely.geometry import LineString, Point
from shapely.geometry.polygon import orient
from shapely.ops import unary_union

# Each line is a hand-drawn centerline on a seven-unit cap grid. The baseline
# is at y=7. Vertical bars separate individual strokes of the same glyph.
STROKES = {
    "A": "0,7 0,3 2,0 3,0 5,3 5,7 | 0,4 5,4",
    "B": "0,7 0,0 3.7,0 5,1.2 5,2.4 3.8,3.4 0,3.4 | 3.6,3.4 5,4.6 5,5.8 3.7,7 0,7",
    "C": "5,1.1 3.9,0 1.2,0 0,1.2 0,5.8 1.2,7 4,7 5,6",
    "D": "0,7 0,0 3.2,0 5,1.8 5,5.2 3.2,7 0,7",
    "E": "4.8,0 0,0 0,7 4.8,7 | 0,3.4 3.6,3.4",
    "F": "4.8,0 0,0 0,7 | 0,3.4 3.6,3.4",
    "G": "5,1 4,0 1.2,0 0,1.2 0,5.8 1.2,7 4,7 5,6 5,4 3,4",
    "H": "0,0 0,7 | 5,0 5,7 | 0,3.4 5,3.4",
    "I": "0,0 2.8,0 | 1.4,0 1.4,7 | 0,7 2.8,7",
    "J": "1.7,0 4.6,0 4.6,5.6 3.2,7 1.2,7 0,5.8",
    "K": "0,0 0,7 | 4.6,0 1.1,3.4 0,3.4 | 1.3,3.4 5,7",
    "L": "0,0 0,7 4.4,7",
    "M": "0,7 0,0 1,0 3,3.2 5,0 6,0 6,7",
    "N": "0,7 0,0 0.5,0 4.6,7 5,7 5,0",
    "O": "1.3,0 3.7,0 5,1.3 5,5.7 3.7,7 1.3,7 0,5.7 0,1.3 1.3,0",
    "P": "0,7 0,0 3.7,0 5,1.3 5,2.7 3.7,4 0,4",
    "Q": "1.3,0 3.7,0 5,1.3 5,5.7 3.7,7 1.3,7 0,5.7 0,1.3 1.3,0 | 3.2,5.4 5.3,7.5",
    "R": "0,7 0,0 3.8,0 5,1.2 5,2.5 3.7,3.8 0,3.8 | 2.4,3.8 5,7",
    "S": "4.9,1 3.9,0 1.1,0 0,1.1 0,2.4 1.1,3.5 3.8,3.5 5,4.7 5,5.9 3.9,7 1,7 0,6",
    "T": "0,0 5.4,0 | 2.7,0 2.7,7",
    "U": "0,0 0,5.7 1.3,7 3.7,7 5,5.7 5,0",
    "V": "0,0 0,2.5 2.4,7 2.8,7 5.2,2.5 5.2,0",
    "W": "0,0 0.6,6.9 1.3,7 3.2,3.8 5.1,7 5.8,6.9 6.4,0",
    "X": "0,0 5,7 | 5,0 0,7",
    "Y": "0,0 0,1.4 2.6,4.1 5.2,1.4 5.2,0 | 2.6,4.1 2.6,7",
    "Z": "0,0 5,0 5,0.7 0,6.3 0,7 5,7",
    "a": "0.5,2.8 1.1,2.2 3.4,2.2 4.3,3.1 4.3,7 | 4.3,4.3 1.1,4.3 0,5.3 0,6 1,7 3.4,7 4.3,6",
    "b": "0,0 0,7 | 0,3.4 1.2,2.2 3.2,2.2 4.4,3.4 4.4,5.8 3.2,7 1.2,7 0,5.8",
    "c": "4,3 3.2,2.2 1.2,2.2 0,3.4 0,5.8 1.2,7 3.2,7 4,6.2",
    "d": "4.4,0 4.4,7 | 4.4,3.4 3.2,2.2 1.2,2.2 0,3.4 0,5.8 1.2,7 3.2,7 4.4,5.8",
    "e": "0,4.6 4.3,4.6 4.3,3.3 3.2,2.2 1.2,2.2 0,3.4 0,5.8 1.2,7 3.3,7 4.2,6.2",
    "f": "0.9,7 0.9,1.2 2.1,0 3.5,0 | 0,2.7 2.9,2.7",
    "g": "4.4,2.2 4.4,8 3.2,9.2 0.9,9.2 | 4.4,3.4 3.2,2.2 1.2,2.2 0,3.4 0,5.5 1.2,6.7 3.2,6.7 4.4,5.5",
    "h": "0,0 0,7 | 0,3.5 1.3,2.2 3.1,2.2 4.3,3.4 4.3,7",
    "i": "0,0.1 | 0,2.3 0,7",
    "j": "1.6,0.1 | 1.6,2.3 1.6,8.1 0.5,9.2 -0.4,9.2",
    "k": "0,0 0,7 | 3.9,2.2 1.2,4.6 0,4.6 | 1.4,4.6 4,7",
    "l": "0,0 0,6.2 0.8,7 1.5,7",
    "m": "0,7 0,2.2 | 0,3.3 1.1,2.2 2.2,2.2 3.2,3.2 3.2,7 | 3.2,3.3 4.3,2.2 5.5,2.2 6.5,3.2 6.5,7",
    "n": "0,7 0,2.2 | 0,3.5 1.3,2.2 3.1,2.2 4.3,3.4 4.3,7",
    "o": "1.2,2.2 3.2,2.2 4.4,3.4 4.4,5.8 3.2,7 1.2,7 0,5.8 0,3.4 1.2,2.2",
    "p": "0,9.2 0,2.2 | 0,3.4 1.2,2.2 3.2,2.2 4.4,3.4 4.4,5.8 3.2,7 1.2,7 0,5.8",
    "q": "4.4,9.2 4.4,2.2 | 4.4,3.4 3.2,2.2 1.2,2.2 0,3.4 0,5.8 1.2,7 3.2,7 4.4,5.8",
    "r": "0,7 0,2.2 | 0,3.6 1.4,2.2 3.1,2.2",
    "s": "3.8,2.8 3.2,2.2 0.9,2.2 0,3.1 0,3.7 0.9,4.6 3.1,4.6 4,5.5 4,6.1 3.1,7 0.8,7 0.1,6.3",
    "t": "1,0.6 1,6.1 1.9,7 3,7 | 0,2.6 3,2.6",
    "u": "0,2.2 0,5.9 1.1,7 3.1,7 4.2,5.9 | 4.2,2.2 4.2,7",
    "v": "0,2.2 0,3.3 2.1,7 2.4,7 4.5,3.3 4.5,2.2",
    "w": "0,2.2 0.6,7 1.2,7 3,4.3 4.8,7 5.4,7 6,2.2",
    "x": "0,2.2 4.2,7 | 4.2,2.2 0,7",
    "y": "0,2.2 0,3.2 2.3,6.8 | 4.6,2.2 4.6,3.2 1.6,8.4 0.5,9.2 -0.2,9.2",
    "z": "0,2.2 4,2.2 4,2.7 0,6.5 0,7 4.1,7",
    "0": "1.2,0 3.5,0 4.7,1.2 4.7,5.8 3.5,7 1.2,7 0,5.8 0,1.2 1.2,0 | 0.4,5.8 4.3,1.2",
    "1": "0.8,1.5 2.3,0 2.3,7 | 0.5,7 4.2,7",
    "2": "0,1.1 1.1,0 3.5,0 4.7,1.2 4.7,2.5 0,6.3 0,7 4.7,7",
    "3": "0,0.8 0.8,0 3.5,0 4.7,1.2 4.7,2.3 3.4,3.5 1.8,3.5 | 3.4,3.5 4.7,4.7 4.7,5.8 3.5,7 0.9,7 0,6.1",
    "4": "3.6,7 3.6,0 3,0 0,4.1 0,4.8 4.8,4.8",
    "5": "4.6,0 0.4,0 0.4,3.2 3.5,3.2 4.7,4.4 4.7,5.8 3.5,7 1,7 0,6",
    "6": "4.3,0 2,0 0,2 0,5.8 1.2,7 3.5,7 4.7,5.8 4.7,4.5 3.5,3.3 1.3,3.3 0,4.6",
    "7": "0,0 4.7,0 4.7,0.8 1.3,7",
    "8": "1.2,0 3.5,0 4.7,1.2 4.7,2.3 3.5,3.5 1.2,3.5 0,2.3 0,1.2 1.2,0 | 1.2,3.5 0,4.7 0,5.8 1.2,7 3.5,7 4.7,5.8 4.7,4.7 3.5,3.5",
    "9": "4.7,2.4 3.5,3.6 1.2,3.6 0,2.4 0,1.2 1.2,0 3.5,0 4.7,1.2 4.7,5.1 2.8,7 0.4,7",
    "!": "0,0 0,4.5 | 0,6.9", "?": "0,1.1 1.1,0 3.3,0 4.4,1.1 4.4,2.4 2.1,4.3 2.1,4.8 | 2.1,6.9",
    ".": "0,6.9", ",": "0.7,6.6 0,8.1", ":": "0,2.6 | 0,6.3", ";": "0.7,2.6 | 0.7,6.3 0,7.8",
    "'": "0.5,-0.1 0,1.2", '"': "0.5,-0.1 0,1.2 | 2.3,-0.1 1.8,1.2",
    "‘": "0,1.2 0.4,-0.1", "’": "0.5,-0.1 0,1.2", "“": "0,1.2 0.4,-0.1 | 1.8,1.2 2.2,-0.1", "”": "0.5,-0.1 0,1.2 | 2.3,-0.1 1.8,1.2",
    "(": "2,-0.5 0,1.5 0,5.6 2,7.6", ")": "0,-0.5 2,1.5 2,5.6 0,7.6",
    "[": "1.8,-0.5 0,-0.5 0,7.5 1.8,7.5", "]": "0,-0.5 1.8,-0.5 1.8,7.5 0,7.5",
    "{": "2.4,-0.5 1.2,0.7 1.2,2.4 0,3.5 1.2,4.6 1.2,6.3 2.4,7.5", "}": "0,-0.5 1.2,0.7 1.2,2.4 2.4,3.5 1.2,4.6 1.2,6.3 0,7.5",
    "/": "0,7 4.1,0", "\\": "0,0 4.1,7", "|": "0,-0.5 0,7.5",
    "-": "0,4 2.7,4", "–": "0,4 4.8,4", "—": "0,4 7.3,4", "_": "0,7.8 4.7,7.8",
    "+": "0,3.6 4,3.6 | 2,1.6 2,5.6", "=": "0,2.6 4.2,2.6 | 0,4.6 4.2,4.6",
    "<": "3.4,1 0,3.6 3.4,6.2", ">": "0,1 3.4,3.6 0,6.2", "^": "0,2.1 1.8,0.1 3.6,2.1",
    "%": "0,7 5.4,0 | 0.8,0 1.6,0.8 0.8,1.6 0,0.8 0.8,0 | 4.6,5.4 5.4,6.2 4.6,7 3.8,6.2 4.6,5.4",
    "#": "1.7,0.7 0.8,6.8 | 4.3,0.7 3.4,6.8 | 0,2.7 5.1,2.7 | 0,4.9 5,4.9",
    "@": "5.2,5.4 4.2,5.4 4.2,2.5 2.5,2.5 1.7,3.3 1.7,4.7 2.5,5.5 3.3,5.5 4.2,4.6 | 5.2,5.4 6.2,4.4 6.2,1.4 4.8,0 1.5,0 0,1.5 0,5.5 1.5,7 4.7,7",
    "&": "5,7 0.7,2.6 0.7,1 1.7,0 3,0 4,1 4,2 0,5 0,6 1,7 2.9,7 5,4.5",
    "$": "4.4,1.5 3.5,0.8 1.2,0.8 0.3,1.7 0.3,2.7 1.2,3.6 3.3,3.6 4.4,4.7 4.4,5.5 3.5,6.4 1.2,6.4 0.3,5.6 | 2.4,-0.5 2.4,0.8 | 2.4,6.4 2.4,7.7",
    "*": "1.9,0.2 1.9,3.8 | 0.2,1 3.6,3 | 3.6,1 0.2,3",
    "~": "0,4.4 1.2,3.2 3.3,4.2 4.5,3", "§": "3.6,0.7 3,0 1.1,0 0.1,1 0.1,2 3.8,4.3 3.8,5.3 2.8,6.2 | 1.1,2.6 0.1,3.6 0.1,4.6 3.8,7 3.8,8 2.8,9 1,9 0.3,8.3",
    "·": "0,3.8", "…": "0,6.9 | 2,6.9 | 4,6.9", "×": "0,2 3.7,5.7 | 3.7,2 0,5.7",
    "°": "1,0 2,1 1,2 0,1 1,0", "✓": "0,4.5 1.7,6.2 5.3,1.4",
}
STROKES[chr(96)] = "0,-0.1 0.7,1.1"


def make_glyph(character, paths, radius):
    shapes = []
    for path in paths.split("|"):
        points = [tuple(map(float, pair.split(","))) for pair in path.split()]
        line = Point(points[0]) if len(points) == 1 else LineString(points)
        shapes.append(line.buffer(radius, cap_style="square", join_style="bevel"))
    silhouette = unary_union(shapes).simplify(0.004, preserve_topology=True)
    polygons = [silhouette] if silhouette.geom_type == "Polygon" else silhouette.geoms
    # A slight forward slope and optically spaced sides. Digits share one advance.
    def horizontal(x, y):
        return (x + (7 - y) * 0.055) * 86

    bounds = [horizontal(x, y) for p in polygons for x, y in p.exterior.coords]
    width = max(bounds) - min(bounds)
    advance = 608 if character.isdecimal() else round(width + 94)
    bearing = round((advance - width) / 2)
    pen = TTGlyphPen(None)
    for shape in polygons:
        # The y flip below turns this into the clockwise TrueType outer contour.
        shape = orient(shape, sign=1)
        for ring in (shape.exterior, *shape.interiors):
            points = [(round(horizontal(x, y) - min(bounds) + bearing), round((7 - y) * 94))
                      for x, y in list(ring.coords)[:-1]]
            pen.moveTo(points[0])
            for point in points[1:]:
                pen.lineTo(point)
            pen.closePath()
    return pen.glyph(), (advance, bearing)


def build(style, radius, weight, folder):
    glyphs, metrics, cmap = {}, {}, {}
    for char, drawing in STROKES.items():
        name = "uni%04X" % ord(char)
        cmap[ord(char)] = name
        glyphs[name], metrics[name] = make_glyph(char, drawing, radius)
    glyphs[".notdef"], metrics[".notdef"] = make_glyph("", "0,0 4,0 4,7 0,7 0,0", radius)
    glyphs["space"] = TTGlyphPen(None).glyph()
    metrics["space"] = (300, 0)
    cmap.update({32: "space", 160: "space"})
    builder = FontBuilder(1000, isTTF=True)
    builder.setupGlyphOrder([".notdef", "space", *sorted(set(cmap.values()) - {"space"})])
    builder.setupCharacterMap(cmap)
    builder.setupGlyf(glyphs)
    builder.setupHorizontalMetrics(metrics)
    builder.setupHorizontalHeader(ascent=790, descent=-260)
    builder.setupNameTable({
        "familyName": "Zebes Relay", "styleName": style, "fullName": "Zebes Relay " + style,
        "psName": "ZebesRelay-" + style, "uniqueFontIdentifier": "ZebesRelay-" + style + "-1.000",
        "version": "Version 1.000", "designer": "Zebes Trivia contributors",
        "copyright": "Copyright 2026 Zebes Trivia contributors", "licenseDescription": "MIT License",
    })
    builder.setupOS2(usWeightClass=weight, fsSelection=0x20 if weight == 700 else 0x40,
                     sTypoAscender=790, sTypoDescender=-260, sTypoLineGap=0,
                     usWinAscent=790, usWinDescent=280, sxHeight=500, sCapHeight=710)
    builder.setupPost()
    builder.font["head"].macStyle = 1 if weight == 700 else 0
    builder.font["head"].created = builder.font["head"].modified = 3857500800
    builder.font.recalcTimestamp = False
    builder.font.flavor = "woff2"
    builder.save(folder / ("zebes-relay-" + style.lower() + ".woff2"))


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    site = root / "dist" if (root / "dist/index.html").exists() else root
    build("Regular", 0.45, 400, site / "assets")
    build("Bold", 0.66, 700, site / "assets")
