const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const assessmentRoutes = require('./routes/assesment');
const userRoutes = require('./routes/User');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/assessments', assessmentRoutes);
app.use('/api/user',userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));