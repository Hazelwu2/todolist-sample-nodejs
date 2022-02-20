const http = require('http')
const { v4: uuidv4 } = require('uuid')

const todos = [
  {
    id: uuidv4(),
    title: '今天要洗澡'
  }
]

const requestListener = (req, res) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE'
  }

  let body = ''
  // 接收資料
  req.on('data', (chunk) => {
    body += chunk
  })


  if (req.url == '/todos' && req.method === 'GET') {
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      status: 'success',
      data: todos
    }))
    res.end()
  } else if (req.url == '/todos' && req.method == 'POST') {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title
        if (title === undefined) {
          res.writeHead(400, headers)
          res.write(JSON.stringify({
            status: 'error',
            message: '欄位未填寫正確'
          }))
          res.end()
        } else {
          const todo = {
            title,
            id: uuidv4()
          }

          todos.push(todo)

          res.writeHead(200, headers)
          res.write(JSON.stringify({
            status: 'success',
            data: todos
          }))
          res.end()
        }

      } catch (error) {
        console.log('程式錯誤')
        res.writeHead(400, headers)
        res.write(JSON.stringify({
          status: 'error',
          message: '欄位未填寫正確或無此 todo id'
        }))
        res.end()
      }
    })
  }
  else {
    res.writeHead(404, headers)
    res.write(JSON.stringify({
      status: 'failed',
      message: '無此路由'
    }))
    res.end()
  }
}

const server = http.createServer(requestListener)
server.listen(10988)