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


  if (req.url == '/todos' && req.method === 'GET') {
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      status: 'success',
      data: todos
    }))
    res.end()
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    res.end()
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