require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Auth0 JWT middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
});

// Public endpoint
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public endpoint - no authentication required' });
});

// Protected endpoint
app.get('/api/private', checkJwt, (req, res) => {
  res.json({ message: 'Private endpoint - authentication required' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
