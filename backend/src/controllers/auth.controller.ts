import { Router } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const router = Router();

// Auth0 JWT middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
});

// Endpoint to verify token and get user info
router.get('/verify', checkJwt, (req, res) => {
  // Token is valid if middleware passes
  res.json({ 
    isValid: true,
    user: req.auth
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

export default router;
