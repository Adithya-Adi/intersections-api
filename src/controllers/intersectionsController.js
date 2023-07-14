/* eslint-disable max-len */
const turf = require('@turf/turf');
const linesData = require('../data/lines.json');

/**
 * Find intersecting lines between a given linestring and a set of lines.
 *
 * @param {Object} lineString - The GeoJSON linestring.
 * @return {Array} - Array of intersecting lines with line IDs and intersection points.
 */
const findIntersectingLines = (lineString) => {
  // Create an array to store the intersecting lines
  const intersectingLines = linesData.map((line, index) => {
    // Convert the line coordinates to a Turf LineString
    const lineData = turf.lineString([line.line.coordinates[0], line.line.coordinates[1]]);

    // Check for intersection between the linestring and the line
    const intersect = turf.lineIntersect(lineString, lineData);

    if (intersect.features.length > 0) {
      // Generate the line ID in the format L01, L02, etc.
      const lineId = `L${index + 1 < 10 ? '0' : ''}${index + 1}`;

      // Return the intersecting line with line ID and intersection point
      return {
        lineId: lineId,
        intersectionPoint: intersect.features[0].geometry.coordinates,
      };
    }
  }).filter(Boolean);

  // Return the array of intersecting lines
  return intersectingLines;
};

module.exports = {
  findIntersectingLines,
};
