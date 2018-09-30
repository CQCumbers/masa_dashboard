const path = require('path');
const fs = require('fs');
const papa = require('papaparse');
const chokidar = require('chokidar');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('/sensors', (req, res) => {
  papa.parse(fs.createReadStream('sensorConfig.csv'), {
    header: true, dynamicTyping: true,
    complete: ({ data }) => { res.json(data); }
  });
});

io.on('connection', socket => {
  const watcher = chokidar.watch('sensorData.csv');
  watcher.on('all', path => {
    papa.parse(fs.createReadStream(path), {
      dynamicTyping: true,
      complete: ({ data }) => {
        socket.emit('update', data[1]);
      }
    });
  })
});

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Dashboard API listening on ${port}`);
