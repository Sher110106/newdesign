const width = 800;
const height = 600;
setDocDimensions(width, height);

const worldMap = [
    // North America
    [-130, 55], [-60, 60], [-45, 40], [-65, 30], [-85, 15], [-100, 25], [-120, 30], [-130, 55],
    // South America
    [-85, 15], [-65, -5], [-45, -25], [-40, -50], [-55, -60], [-70, -55], [-85, -30], [-85, 15],
    // Europe
    [0, 55], [10, 50], [20, 55], [30, 60], [20, 65], [10, 60], [0, 55],
    // Africa
    [10, 50], [20, 45], [25, 35], [20, 10], [10, -10], [5, -25], [0, -35], [10, -35], [20, -10], [10, 50],
    // Asia
    [20, 65], [30, 70], [50, 70], [60, 60], [70, 40], [80, 20], [90, 10], [85, 0], [70, 0], [60, 20], [50, 30], [30, 60], [20, 65],
    // Australia
    [110, -10], [120, -15], [135, -25], [150, -30], [150, -40], [140, -45], [130, -40], [120, -35], [110, -30], [110, -10],
];


const scaleAndTranslate = (coords, scale, offsetX, offsetY) => {
    return coords.map(([x, y]) => [
        x * scale + offsetX,
        y * scale + offsetY
    ]);
};


const scaledWorldMap = scaleAndTranslate(worldMap, 3, width / 2, height / 2);


const convertToLines = (points) => {
    const lines = [];
    for (let i = 0; i < points.length - 1; i++) {
        lines.push([points[i], points[i + 1]]);
    }
    return lines;
};


const worldMapLines = convertToLines(scaledWorldMap);


drawLines(worldMapLines, { stroke: 'black', strokeWidth: 2 });
