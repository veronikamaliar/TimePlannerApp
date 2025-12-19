const { io } = require("socket.io-client");

const socket = io("http://localhost:3000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQwLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2NDAwOTU0MywiZXhwIjoxNzY0NjE0MzQzfQ.aOkHV3EpHwDepnhBG77jTOQaCPxKu-5o6hAmX9c8VjY"
  }
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  
  socket.emit("joinRoom", "test-room");
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});

socket.on("error", (err) => {
  console.log("❌ Error:", err);
});
