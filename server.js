const http = require('http')
const { v4: uuidv4 } = require('uuid')
const errorHandle = require('./errorHandle')

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
          errorHandle(res, 400)
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
        errorHandle(res, 400)
      }
    })
  }
  else {
    errorHandle(res, 404)
  }
}

const server = http.createServer(requestListener)
server.listen(10988)