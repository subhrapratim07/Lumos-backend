require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ 1. Improved CORS Configuration
// This allows your Netlify frontend to talk to this Render backend
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ 2. Use ENV variables (Render provides PORT automatically)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ 3. MongoDB Connection with Error Handling
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });

// ✅ 4. Routes
// Make sure these files exist in your 'backend/routes' folder
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// ✅ 5. Health Check / Root Route
// Visit your Render URL in a browser to see this message
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Lumos API is running...",
    status: "Healthy",
    time: new Date().toISOString()
  });
});

// ✅ 6. Global Error Handler (Prevents server crashes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is live on port ${PORT}`);
});