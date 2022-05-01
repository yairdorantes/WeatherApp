export default function CardinalDirection(bearing) {
    var cardinalPoints = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    var index = bearing - 22.5;
    if (index < 0) index += 360;
    index = parseInt(index / 45);
    return (cardinalPoints[index]);
}


