import express from 'express';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';
import { config } from './config';

const app = express();

// Configure CORS
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Auth0 JWT middleware
const checkJwt = auth({
  audience: config.auth0.audience,
  issuerBaseURL: config.auth0.issuerBaseURL,
});

// Public endpoint
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public endpoint - no authentication required' });
});

// Protected endpoint
app.get('/api/private', checkJwt, (req, res) => {
  res.json({ message: 'Private endpoint - authentication required' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log('Allowed origins:', config.allowedOrigins);
});
