require('dotenv').config()
const express = require('express')
const cors = require('cors') 
const mongoose = require('./config/db')
const authRoutes = require('./routes/auth')
const appRatingRoutes = require('./routes/appRatingRoutes');
const app = express()


const allowedOrigins = [
  'http://localhost:3000',
  'https://oneinall.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/app-ratings',appRatingRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
