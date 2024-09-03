const express = require('express');
const clinicalDataRoutes = require('./src/routes/clinicalDataRoutes');
const { initializeDb } = require('./src/db/db');

const app = express();

//Connect DB
initializeDb()

// Use the clinical data routes
app.use('/api', clinicalDataRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
