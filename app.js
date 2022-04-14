import {
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
import {
  getAllTodoUrl,
  createTodoUrl,
  deleteAllTodoUrl,
  deleteTodoUrl,
  updateTodoUrl,
  isOptions
} from './router/index.js'

export default async (req, res) => {
  if (await getAllTodoUrl(req)) getTodo(req, res)
  else if (await createTodoUrl(req)) createTodo(req, res)
  else if (await deleteAllTodoUrl(req)) deleteAllTodo(req, res)
  else if (await deleteTodoUrl(req)) deleteTodo(req, res)
  else if (await updateTodoUrl(req)) updateTodo(req, res)
  else if (await isOptions(req)) options(req, res)
  else errorHandle(res, 404)
}
