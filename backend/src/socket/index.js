const { Server } = require("socket.io");
const rateLimitWS = require("./rateLimitWS");
const { authenticateSocket } = require("../middleware/authSocket");
const { registerTaskHandlers } = require("./handlers/taskHandlers");
const { registerFileHandlers } = require("./handlers/fileHandlers");
const { registerTimelogHandlers } = require("./handlers/timelogHandlers");
const { registerUserHandlers } = require("./handlers/userHandlers");
const { registerNotificationHandlers } = require("./handlers/notificationHandlers");
const { getEventsSince } = require("./eventHistory");

const onlineUsers = new Map(); 
const wsLimiter = rateLimitWS(5, 1000);

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",   
        "https://time-planner-app.onrender.com" ,
        "http://localhost:5500"
      ],
      
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    const userId = socket.user.id;
    socket.userId = userId;

    console.log(`✅ Новий клієнт підключився: ${socket.id}, користувач: ${socket.user.name}`);

    socket.join(`user:${userId}`);
    console.log(`📌 Socket ${socket.id} приєднався до кімнати user:${userId}`);


    onlineUsers.set(userId, socket.id);
    io.emit("user:statusChanged", { userId, online: true });

    const originalOn = socket.on.bind(socket);
    socket.on = (event, callback) => {
      originalOn(event, (data) => {
        wsLimiter(socket, () => {
          callback(data);
        }, event);
      });
    };

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`👥 Користувач ${socket.user.name} приєднався до кімнати ${roomId}`);
    });

    socket.on("sync:events", (lastTimestamp) => {
      const missedEvents = getEventsSince(lastTimestamp || 0);
      socket.emit("sync:events", missedEvents);
    });

    registerTaskHandlers(io, socket);
    registerFileHandlers(io, socket);
    registerTimelogHandlers(io, socket);
    registerUserHandlers(io, socket);
    registerNotificationHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`❌ Користувач ${socket.user.name} відключився`);
      onlineUsers.delete(userId);
      io.emit("user:statusChanged", { userId, online: false });
    });
  });

  return io;
}

module.exports = { initSocket, onlineUsers };
