const http = require('http')
const { v4: uuidv4 } = require('uuid');
const { headers, errorHandle, successHandle } = require('./errorHandle')

const todos = []

const requestListener = (req, res) => {
  let body = ''

  // 接收資料
  req.on('data', (chunk) => {
    body += chunk
  })

  // 取得所有 Todos
  if (req.url === '/todos' && req.method === 'GET') {
    successHandle(res, todos)
    // 新增一筆 todos
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title
        if (title !== undefined) {
          const todo = {
            id: uuidv4(),
            title
          }
          todos.push(todo)
          successHandle(res, todos)
        } else {
          errorHandle(res, 400)
        }
      } catch (error) {
        errorHandle(res, 400)
      }
    })
    // 刪除所有 todos
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    todos.length = 0
    successHandle(res, todos)
  } else if (req.url.startsWith('/todos') && req.method === 'DELETE') {
    const id = req.url.split('/').pop()
    const index = todos.findIndex(el => el.id === id)

    if (index !== -1) {
      todos.splice(index, 1)
      successHandle(res, todos)
    } else {
      errorHandle(res, 400)
    }
    // 更新單筆 todo
  } else if (req.url.startsWith('/todos') && req.method === 'PATCH') {
    req.on('end', () => {

      try {
        const title = JSON.parse(body).title
        const id = req.url.split('/').pop()
        const index = todos.findIndex(el => el.id === id)

        if (title && index !== -1) {
          todos[index].title = title
          successHandle(res, todos)
        } else {
          errorHandle(res, 400)
        }

      } catch (error) {
        errorHandle(res, 400)
      }
    })

  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandle(res, 404)
  }
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 10988)