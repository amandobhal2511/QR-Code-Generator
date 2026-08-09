import express from 'express';
import router from './routes/routes.js';
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(router);


export default app;

