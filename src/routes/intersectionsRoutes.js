/* eslint-disable new-cap */
const express = require('express');
const {
  findIntersectingLines,
} = require('../controllers/intersectionsController');
const authenticate = require('../middlewares/authenticate');
const turf = require('@turf/turf');

const router = express.Router();

// API endpoint for finding intersecting lines
router.post('/intersections', authenticate, (req, res, next) => {
  try {
    // Check if the request body is missing
    if (req.body.length === 0) {
      const error = new Error('Request Body is missing');
      error.statusCode = 400;
      throw error;
    }

    // Extract the linestring coordinates from the request body
    const {type, coordinates} = req.body;

    // Check if the linestring is invalid
    if (type !== 'LineString' || !Array.isArray(coordinates)) {
      const error = new Error('Linestring is invalid');
      error.statusCode = 500;
      throw error;
    }

    // Convert the coordinates to a Turf LineString
    const lineString = turf.lineString(coordinates);

    // Find the intersecting lines using the provided function
    const intersectingLines = findIntersectingLines(lineString);

    // Return the result
    if (intersectingLines.length === 0) {
      return res.json([]);
    } else {
      return res.json(intersectingLines);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
