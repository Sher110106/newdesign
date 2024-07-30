// Set the dimensions of the document
const width = 800;
const height = 600;
setDocDimensions(width, height);

const worldMap = [
    // North America
    [-130, 55], [-60, 60], [-45, 40], [-65, 30], [-85, 15], [-100, 25], [-120, 30], [-130, 55], null,
    // South America
    [-85, 15], [-65, -5], [-45, -25], [-40, -50], [-55, -60], [-70, -55], [-85, -30], [-85, 15], null,
    // Europe
    [0, 55], [10, 50], [20, 55], [30, 60], [20, 65], [10, 60], [0, 55], null,
    // Africa
    [10, 50], [20, 45], [25, 35], [20, 10], [10, -10], [5, -25], [0, -35], [10, -35], [20, -10], [10, 50], null,
    // Asia
    [20, 65], [30, 70], [50, 70], [60, 60], [70, 40], [80, 20], [90, 10], [85, 0], [70, 0], [60, 20], [50, 30], [30, 60], [20, 65], null,
    // Australia
    [110, -10], [120, -15], [135, -25], [150, -30], [150, -40], [140, -45], [130, -40], [120, -35], [110, -30], [110, -10]
];

// Function to scale and translate coordinates to fit the canvas
const scaleAndTranslate = (coords, scale, offsetX, offsetY) => {
    return coords.map(([x, y]) => [
        x * scale + offsetX,
        y * scale + offsetY
    ]);
};

// Adjust scale and offset to better fit the canvas
const scale = 3;
const offsetX = width / 2;
const offsetY = height / 2;

// Function to convert the points to Bézier curves for drawing
const convertToBezierCurves = (points) => {
    const curves = [];
    for (let i = 0; i < points.length - 1; i++) {
        const midPoint = [(points[i][0] + points[i + 1][0]) / 2, (points[i][1] + points[i + 1][1]) / 2];
        curves.push([points[i], midPoint, points[i + 1]]);
    }
    // Close the loop for each continent if needed
    if (points.length > 2) {
        const lastMidPoint = [(points[points.length - 1][0] + points[0][0]) / 2, (points[points.length - 1][1] + points[0][1]) / 2];
        curves.push([points[points.length - 1], lastMidPoint, points[0]]);
    }
    return curves;
};

// Function to segment world map coordinates by continent
const segmentWorldMap = (worldMap) => {
    const segments = [];
    let currentSegment = [];
    for (const point of worldMap) {
        if (point === null) {
            if (currentSegment.length > 0) {
                segments.push(currentSegment);
                currentSegment = [];
            }
        } else {
            currentSegment.push(point);
        }
    }
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }
    return segments;
};

// Segment the world map by continent
const segmentedWorldMap = segmentWorldMap(worldMap);

// Scale and translate the world map coordinates for each segment
const scaledSegmentedWorldMap = segmentedWorldMap.map(segment => scaleAndTranslate(segment, scale, offsetX, offsetY));

// Convert each segment to Bézier curves
const worldMapCurves = scaledSegmentedWorldMap.map(segment => convertToBezierCurves(segment));

// Function to draw Bézier curves
const drawBezierCurves = (curves, style) => {
    curves.forEach(curve => {
        drawLines([[curve[0], curve[1]], [curve[1], curve[2]]], style);
    });
};

// Draw the world map with colors for each continent
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8F33', '#33FFF5'];
worldMapCurves.forEach((continentCurves, index) => {
    drawBezierCurves(continentCurves, { stroke: colors[index % colors.length], strokeWidth: 2 });
});
