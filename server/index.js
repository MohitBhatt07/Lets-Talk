const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.js');
const messageRoutes = require('./routes/message.js');
const chatRoutes = require('./routes/chat.js');
const mongoDBConnect = require('./mongodb/connection.js');

const {Server} = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const allowedOrigin = process.env.BASE_URL;
// const corsConfig = {
//   origin: allowedOrigin,
//   credentials: true,
// };
// app.use(cors(corsConfig));
app.use(cors({
  origin : (origin ,callback)=>{
    if(allowedOrigin.includes(origin)){
      console.log(origin ,allowedOrigin);
      callback(null,true);
    }
    else{
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials : true,
  methods : ["GET", "POST", "PUT", "DELETE"],
}));

const PORT = process.env.PORT || 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
mongoose.set('strictQuery', false);
mongoDBConnect();

const server = app.listen(PORT, () => {
  console.log(`Server Listening at PORT - ${PORT}`);
});
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigin,
  },
});
io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit('connected');
  });
  socket.on('join room', (room) => {
    socket.join(room);
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieve) => {
    var chat = newMessageRecieve.chatId;
    if (!chat.users) console.log('chats.users is not defined');
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieve.sender._id) return;
      socket.in(user._id).emit('message recieved', newMessageRecieve);
    });
  });
});