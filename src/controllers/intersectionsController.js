const turf = require('@turf/turf');
const linesData = require('../data/lines.json');

const findIntersectingLines = (lineString) => {
  const intersectingLines = linesData.map((line, index) => {
    const lineData = turf.lineString(
        [line.line.coordinates[0], line.line.coordinates[1]],
    );
    const intersect = turf.lineIntersect(lineString, lineData);
    if (intersect.features.length > 0) {
      const lineId = `L${index + 1 < 10 ? '0' : ''}${index + 1}`;
      return {
        lineId: lineId,
        intersectionPoint: intersect.features[0].geometry.coordinates,
      };
    }
  }).filter(Boolean);

  return intersectingLines;
};

module.exports = {
  findIntersectingLines,
};
