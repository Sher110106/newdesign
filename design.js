// Import Blot toolkit functions
const { Turtle, scale, translate, drawLines } = bt;

// Set the dimensions of the document
const width = 1000;
const height = 600;
setDocDimensions(width, height);

// Function to generate a pseudo-random number based on date and time
const pseudoRandom = (seed) => {
    return Math.sin(seed) * 10000 % 1;
};

// Function to create deterministic variation
const varyCoord = (coord, seed) => {
    const variation = pseudoRandom(seed) * 10 - 5; // Vary between -5 and 5
    return coord + variation;
};

// Generate varying world map coordinates
const generateWorldMap = (baseMap, seed) => {
    return baseMap.map(segment => segment === null ? null : [varyCoord(segment[0], seed), varyCoord(segment[1], seed)]);
};

// Base world map coordinates
const baseWorldMap = [
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

// Generate varying world map using current date and time as seed
const dateSeed = new Date().getTime();
const worldMap = generateWorldMap(baseWorldMap, dateSeed);

const scaleAndTranslate = (coords, scale, offsetX, offsetY) => {
    return coords.map(([x, y]) => [
        x * scale + offsetX,
        y * scale + offsetY
    ]);
};

const scale = 3;
const offsetX = width / 2;
const offsetY = height / 2;

const convertToBezierCurves = (points) => {
    const curves = [];
    for (let i = 0; i < points.length - 1; i++) {
        const midPoint = [(points[i][0] + points[i + 1][0]) / 2, (points[i][1] + points[i + 1][1]) / 2];
        curves.push([points[i], midPoint, points[i + 1]]);
    }
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

const segmentedWorldMap = segmentWorldMap(worldMap);

const scaledSegmentedWorldMap = segmentedWorldMap.map(segment => scaleAndTranslate(segment, scale, offsetX, offsetY));

const worldMapCurves = scaledSegmentedWorldMap.map(segment => convertToBezierCurves(segment));

const drawBezierCurves = (curves, style) => {
    curves.forEach(curve => {
        drawLines([[curve[0], curve[1]], [curve[1], curve[2]]], style);
    });
};

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8F33', '#33FFF5'];
worldMapCurves.forEach((continentCurves, index) => {
    drawBezierCurves(continentCurves, { stroke: colors[index % colors.length], strokeWidth: 2 });
});
