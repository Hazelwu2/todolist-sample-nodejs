import { v4 as uuidv4 } from 'uuid'
import { headers, successHandle, errorHandle } from './resHandle.js'
const todos = []

export default (req, res) => {
  const getAllTodo = req.url === '/todos' && req.method === 'GET'
  const createTodo = req.url === '/todos' && req.method === 'POST'
  const deleteAllTodo = req.url === '/todos' && req.method === 'DELETE'
  const deleteTodo = req.url.startsWith('/todos') && req.method === 'DELETE'
  const updateTodo = req.url.startsWith('/todos') && req.method === 'PATCH'
  const isOptions = req.method === 'OPTIONS'

  let body = ''

  // 接收資料
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

    if (index === -1) {
      errorHandle(res, 400)
      return
    }
    todos.splice(index, 1)
    successHandle(res, todos)
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
