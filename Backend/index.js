import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { app, server } from './SocketIO/server.js';

// Environment
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://talka-tron.vercel.app",
    credentials: true,
}));

// MongoDB Connection
const URI = process.env.MONGODB_URI;
mongoose.connect(URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Deployment static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
    });
}

// Server Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

