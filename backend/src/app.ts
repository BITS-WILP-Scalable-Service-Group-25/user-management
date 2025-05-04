import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authController from './controllers/auth.controller';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Auth microservice running on port ${PORT}`);
});
