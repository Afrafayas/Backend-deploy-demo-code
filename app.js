const express = require('express');
const cors = require('cors');


const app = express();


const userRoutes = require('./routes/userRoutes');

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-deploy-demo-code-4p84.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());


app.use('/api/users',userRoutes);




module.exports = app;
