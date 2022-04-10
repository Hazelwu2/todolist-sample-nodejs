import http from 'http';
import app from './app.js'
import mongoose from 'mongoose';
const PORT = process.env.PORT || 3005

mongoose.connect('mongodb://localhost:27017/hotel')
  .then(() => {
    console.log('資料庫連接成功')
  })
  .catch(error => console.log(error))

const server = http.createServer(app)
server.listen(PORT)