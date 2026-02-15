const express = require('express');
const cors = require('cors');


const app = express();


const userRoutes = require('./routes/userRoutes');

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-deploy-demo-code-4p84.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());


app.use('/api/users',userRoutes);




module.exports = app;
