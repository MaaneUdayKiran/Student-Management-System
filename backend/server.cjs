const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const StudentRoutes = require('./routes/Studentroutes.cjs');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Correct usage

app.use('/api/students', StudentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => console.error(err));
