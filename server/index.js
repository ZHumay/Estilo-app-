const express = require('express');
const { db } = require('./config/db');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const cors = require('cors');
const { webUserRoutes } = require('./routes/webUserRoute');
const { saleRoute } = require('./routes/saleRoute');
const { categoryRoute } = require('./routes/categoryRoute');
const {  womanRoute } = require('./routes/womanRoute');
const { manRoute } = require('./routes/manRoute');
const fileUpload = require('express-fileupload');
const { join } = require('path');

require('dotenv').config()
app.use(express.json())
app.use(cors());
db.connect();

app.use(
    fileUpload({
        safeFileNames: true,
        useTempFiles: true,
        preserveExtension: true,
    })
);
const io = new Server(httpServer, { cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }});

io.on("connection", (socket) => {
    console.log('Socket ', socket.id);
    //socket.on listener ile mesaj bekliyoruz
    socket.on("sendMessage", (data) => {
        io.emit("chatMessage", data)
    })
});

app.use('/api/all', saleRoute)
app.use('/api/webuser', webUserRoutes)
app.use('/api/category', categoryRoute)
app.use('/api/woman', womanRoute)
app.use('/api/man/',manRoute)
app.use("/img", express.static(join(__dirname, 'img')));



httpServer.listen(8080,()=>
{
    console.log(
    "Server started on port 8080"
    )
});

