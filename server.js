require("dotenv").config();

const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

const Hospital = require("./models/Hospital"); // Hospital model

const app = express();

/* ===============================
   DATABASE CONNECTION
================================ */

connectDB();

/* ===============================
   CREATE HTTP SERVER
================================ */

const server = http.createServer(app);

/* ===============================
   SOCKET.IO SETUP
================================ */

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* ===============================
   MIDDLEWARE
================================ */

app.use(cors());
app.use(express.json());

/* PASS SOCKET.IO TO ROUTES */

app.use((req, res, next) => {
  req.io = io;
  next();
});

/* ===============================
   TEST ROUTE
================================ */

app.get("/", (req, res) => {
  res.send("🩸 LifeLine Connect Backend Running");
});

/* ===============================
   API ROUTES
================================ */

app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/hospitals", hospitalRoutes);

/* ===============================
   SOCKET CONNECTION
================================ */

io.on("connection", (socket) => {

  console.log("🔌 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });

});

/* ===============================
   START SERVER
================================ */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});