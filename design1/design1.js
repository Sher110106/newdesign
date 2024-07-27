const width = 800;
const height = 600;
setDocDimensions(width, height);

const lines = [];
for (let x = 0; x < width; x += 10) {
    const y = bt.noise([x * 0.005, 0]) * height;
    lines.push([[x, y], [x, height]]);
}

drawLines(lines, { stroke: 'blue', strokeWidth: 2 });
