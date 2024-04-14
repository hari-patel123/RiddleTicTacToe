const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Define endpoint to fetch a random riddle
app.get('/api/get_riddle', (req, res) => {
  
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
