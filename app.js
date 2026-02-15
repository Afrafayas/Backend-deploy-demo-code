// const express = require('express');
// const cors = require('cors');


// const app = express();


// const userRoutes = require('./routes/userRoutes');

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://frontend-deploy-demo-code-4p84.vercel.app"
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); 
//     if (allowedOrigins.includes(origin)) callback(null, true);
//     else callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true
// }));
// app.use(express.json());


// app.use('/api/users',userRoutes);




// module.exports = app;
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// List of frontends you allow
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-deploy-demo-code-4p84.vercel.app"
];

// Dynamic CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;              // get the frontend making the request
  if (allowedOrigins.includes(origin)) {          // check if it’s in the allowed list
    res.setHeader("Access-Control-Allow-Origin", origin); // allow this exact frontend
  }

  res.setHeader("Access-Control-Allow-Credentials", "true"); // allow cookies
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") return res.sendStatus(200);

  next(); // move on to routes
});

app.use(express.json());
app.use('/api/users', userRoutes);

module.exports = app;
