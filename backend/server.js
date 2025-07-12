const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');

app.use('/api/auth', authRoutes);
app.use('/api/employees',employeeRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=> app.listen(process.env.PORT, () => console.log('Server running')))
  .catch(err => console.log(err));