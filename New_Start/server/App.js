// Import dependencies
import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from './Configs/db.js'
import cookieParser from "cookie-parser";
import http from 'http'
import multer from "multer";
import {Server} from 'socket.io'

// Import of controller route
import userSignupRouter from './Routes/auth/user.SignupRoute.js'
import userLoginRouter from './Routes/auth/user.LoginRoute.js'
import userAccountRecoverRouter from './Routes/auth/user.AccountRecoverRoute.js'
import userAuthDetailSender from './Routes/auth/user.AuthDetailSender.js'
import adminAuthRoute from './Routes/auth/admin.AuthRouter.js'
import systemInfo_Route from './Routes/Dashboard_Route/admin.DashboardRoute.js'
import notificationStoreRoute from './Routes/Dashboard_Route/admin.NotificationRoute.js'
import getNotification from './Routes/Dashboard_Route/admin.getNotificationRoute.js'
import searchRoute from './Routes/Search_Route/user.SearchRoute.js'
import userAuthVerifierRoute from './Routes/auth/user.AuthorizationRoute.js'
import intersetedEmailRoute from './Routes/Footer_Route/user.interestedEmailRoute.js'

// Import of direct controller
import {downloadPdf} from './Controllers/Tools_Controller/imageToPdfController.js'


dotenv.config();
const app = express();

connectDB();

app.use(cors({
  origin: "https://craftdex.in",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());



// =======================================================================================================
// Live user count and daily active user count

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://craftdex.in",
    credentials: true,
  },
});

// Online users
let onlineUsers = 0;

// Daily active users
let dailyUsers = new Set();
let currentDate = new Date().toDateString();

io.on("connection", (socket) => {

  const today = new Date().toDateString();

  if (today !== currentDate) {
    currentDate = today;
    dailyUsers.clear();
  }

  const visitorId = socket.handshake.auth.visitorId;

  onlineUsers++;
  io.emit("userCount", onlineUsers);

  if (visitorId) {
    dailyUsers.add(visitorId);
    io.emit("dailyActiveUsers", dailyUsers.size);
  }

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("userCount", onlineUsers);
  });
});

// =======================================================================================================



// Defailt server route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Signup Route
app.use('/api/auth', userSignupRouter);

// Login Route
app.use('/api/auth', userLoginRouter);

// Account Recover Route
app.use('/api/auth', userAccountRecoverRouter);

// For user authorization
app.use('/api/auth', userAuthDetailSender);

// Admin authentication
app.use('/api/auth', adminAuthRoute);

// System info
app.use('/api/auth', systemInfo_Route);

// Store Notification info
app.use('/api/auth', notificationStoreRoute);

// Get Notification info
app.use('/api/auth', getNotification);

// Search route
app.use('/api', searchRoute);

// User verifier route
app.use('/api/user', userAuthVerifierRoute);

// Footer email route
app.use('/api/user', intersetedEmailRoute);


// ==========================================================================================================
// For download route with multer dependencies

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

app.post(
  "/api/downloadPdf",
  upload.array("images"),
  downloadPdf
);

// ==========================================================================================================





server.listen(3000, () => {
  console.log("🚀 HTTP + SOCKET server running");
});
