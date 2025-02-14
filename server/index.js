const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDB = require("./DataBase/ConnectMongoDB");
const userRoutes = require("./routes/UserRoutes");

dotenv.config();
const app = express();

// CORS Configuration
app.use(
    cors({
        origin: ["http://localhost:3000", process.env.CLIENT_URL], // Allows local and deployed frontend
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: "Content-Type, Authorization",
        credentials: true,
    })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5005;

// Connect to MongoDB and Start Server
connectMongoDB()
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    });

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to Career Craft AI Backend");
});
