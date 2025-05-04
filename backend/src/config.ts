export const config = {
  port: 3000,
  allowedOrigins: [
    'http://localhost:4203',
    'http://127.0.0.1:50247',
    'http://127.0.0.1:4203'
  ],
  auth0: {
    issuerBaseURL: 'https://dev-fxbspsa7ploz2070.us.auth0.com',
    audience: 'http://localhost:3000'
  }
};
