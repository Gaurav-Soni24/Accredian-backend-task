import express from 'express';
import { PrismaClient } from '@prisma/client';
import emailjs from '@emailjs/nodejs';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Add your allowed origins here
    const allowedOrigins = [
      'http://localhost:3000',     // Local development
      'http://localhost:5173',     // Vite default
      'http://127.0.0.1:5173',     // Vite default
      'http://127.0.0.1:3000',    // Vite default alternative
      'https://yourdomain.com',    // Your production domain
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialize EmailJS with your public key
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

// Referral API Endpoint
app.post('/api/referral', async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;

    // Basic validation
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
      return res.status(400).json({ error: 'All fields (referrerName, referrerEmail, refereeName, refereeEmail, course) are required' });
    }

    // Save to Database
    const referral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail, course },
    });

    // Prepare data for EmailJS
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        course,
      },
    };

    // Send Referral Email via EmailJS Node.js SDK
    emailjs.send(
      emailData.service_id,
      emailData.template_id,
      emailData.template_params,
      emailData.user_id
    )
    .then(() => {
      return res.status(201).json({ message: 'Referral submitted successfully', referral });
    })
    .catch((error) => {
      console.error('Error submitting referral email:', error);
      return res.status(500).json({ error: 'Error submitting referral via EmailJS' });
    });

  } catch (error) {
    console.error('Error submitting referral:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});