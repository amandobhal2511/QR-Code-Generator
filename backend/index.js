import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(router);


export default app;

