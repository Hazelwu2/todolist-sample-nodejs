import http from 'http';
import app from './app.js'
import mongoose from 'mongoose';
import 'dotenv/config'
const PORT = process.env.PORT || 3005

// 資料庫
const DB = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
)
const localDB = 'mongodb://localhost:27017/hotel'

mongoose.connect(localDB || DB)
  .then(() => {
    console.log('資料庫連接成功')
  })
  .catch(error => console.log('資料庫連接失敗', error))

const server = http.createServer(app)
server.listen(PORT)