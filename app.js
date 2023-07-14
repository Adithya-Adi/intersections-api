const express = require('express');
const intersectionsRoutes = require('./src/routes/intersectionsRoutes');
const requestLogger = require('./src/middlewares/requestLogger');
const errorHandler = require('./src/middlewares/errorHandler');
require('dotenv').config();
const app = express();

app.use(express.json({limit: '10mb'}));

// Apply request logger middleware
app.use(requestLogger);

// API routes
app.use('/api', intersectionsRoutes);

// Apply error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
