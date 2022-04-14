import { v4 as uuidv4 } from 'uuid'
import {
  headers,
  successHandle,
  errorHandle
} from './resHandle.js'
import {
  getTodo,
  createTodo,
  deleteAllTodo,
  deleteTodo,
  updateTodo,
  options
} from './controller/todo.js'

export default (req, res) => {
  const getAllTodoUrl = req.url === '/todos' && req.method === 'GET'
  const createTodoUrl = req.url === '/todos' && req.method === 'POST'
  const deleteAllTodoUrl = req.url === '/todos' && req.method === 'DELETE'
  const deleteTodoUrl = req.url.startsWith('/todos') && req.method === 'DELETE'
  const updateTodoUrl = req.url.startsWith('/todos') && req.method === 'PATCH'
  const isOptions = req.method === 'OPTIONS'

  let body = ''

  // 接收資料
  req.on('data', (chunk) => {
    body += chunk
  })

  if (getAllTodoUrl) getTodo(req, res)
  else if (createTodoUrl) createTodo(req, res)
  else if (deleteAllTodoUrl) deleteAllTodo(req, res)
  else if (deleteTodoUrl) deleteTodo(req, res)
  else if (updateTodoUrl) updateTodo(req, res)
  else if (isOptions) options(req, res)
  else errorHandle(res, 404)
  // else if (deleteAllTodo) {
  //   todos.length = 0
  //   successHandle(res, todos)
  // } else if (deleteTodo) {
  //   const id = req.url.split('/').pop()
  //   const index = todos.findIndex(el => el.id === id)

  //   if (index === -1) {
  //     errorHandle(res, 400)
  //     return
  //   }
  //   todos.splice(index, 1)
  //   successHandle(res, todos)
  // } else if (updateTodo) {
  //   req.on('end', () => {
  //     try {
  //       const title = JSON.parse(body).title
  //       const id = req.url.split('/').pop()
  //       const index = todos.findIndex(el => el.id === id)

  //       if (index !== -1 && title) {
  //         todos[index].title = title
  //         successHandle(res, todos[index])
  //       } else {
  //         errorHandle(res, 400)
  //       }
  //     } catch (error) {
  //       errorHandle(res, 400)
  //     }
  //   })
  // } else if (isOptions) {
  //   res.writeHead(200, headers)
  //   res.end()
  // } else {
  //   errorHandle(res, 404)
  // }
}
