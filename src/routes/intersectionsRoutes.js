/* eslint-disable new-cap */
const express = require('express');
const {
  findIntersectingLines,
} = require('../controllers/intersectionsController');
const authenticate = require('../middlewares/authenticate');
const turf = require('@turf/turf');

const router = express.Router();

router.post('/intersections', authenticate, (req, res, next) => {
  try {
    if (req.body.length === 0) {
      const error = new Error('Request Body is missing');
      error.statusCode = 400;
      throw error;
    }
    const {type, coordinates} = req.body;
    if (type !== 'LineString' || !Array.isArray(coordinates)) {
      const error = new Error('Linestring is invalid');
      error.statusCode = 500;
      throw error;
    }
    const lineString = turf.lineString(coordinates);
    const intersectingLines = findIntersectingLines(lineString);
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
