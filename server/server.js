import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from './Controllers/clerkWebhooks.js';
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Replace '*' with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to handle cookies or authentication
};

app.use(cors(corsOptions));

//middleware
app.use(express.json());
app.use(clerkMiddleware());
//API TO LISTEN TO CLERK WEBHOOKS
app.use("/api/clerk",clerkWebHooks);
// Routes
app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
