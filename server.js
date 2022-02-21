const http = require('http')
const { v4: uuidv4 } = require('uuid');
const { headers, successHandle, errorHandle } = require('./resHandle')
const todos = []

const requestListener = (req, res) => {
  const getAllTodo = req.url === '/todos' && req.method === 'GET'
  const createTodo = req.url === '/todos' && req.method === 'POST'
  const deleteAllTodo = req.url === '/todos' && req.method === 'DELETE'
  const deleteTodo = req.url.startsWith('/todos') && req.method === 'DELETE'
  const updateTodo = req.url.startsWith('/todos') && req.method === 'PATCH'
  const isOptions = req.method === 'OPTIONS'
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  if (getAllTodo) {
    successHandle(res, todos)
  } else if (createTodo) {
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
  } else if (deleteAllTodo) {
    todos.length = 0
    successHandle(res, todos)
  } else if (deleteTodo) {
    const id = req.url.split('/').pop()
    const index = todos.findIndex(el => el.id === id)

    if (index !== -1) {
      todos.splice(index, 1)
      successHandle(res, todos)
    } else {
      errorHandle(res, 400)
    }
  } else if (updateTodo) {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title
        const id = req.url.split('/').pop()
        const index = todos.findIndex(el => el.id === id)

        if (index !== -1 && title) {
          todos[index].title = title
          successHandle(res, todos[index])
        } else {
          errorHandle(res, 400)
        }
      } catch (error) {
        errorHandle(res, 400)
      }
    })
  } else if (isOptions) {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandle(res, 404)
  }
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 10988)