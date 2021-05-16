const express = require('express');
const { sequelize } = require('./models');
const http = require('http');
const routers = require('./src/routers');
const cors = require('cors');
const {Server} = require('socket.io');
const { socketProfile } = require('./src/controllers/user');
const app = express();
const server = http.createServer(app);
//const io = new Server(server);



const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000" //client domain/url
    }
  });

const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api/v1', routers);
app.use('/uploads', express.static('uploads'));

let interval;

io.on('connection', (socket) => {
    if(interval) {
        clearInterval(interval);
    }

    socket.on('load users', async() => {
        const users = await socketProfile();
        socket.emit('users', users);
    })
})

// app.listen(port, () => {
//     console.log(`Server up on ${port}`)
// })

server.listen(port, () => console.log(`Running on port ${port}`));