import { handleChunk } from '../utils/tool.js'
import { headers, successHandle, errorHandle } from '../resHandle.js'
import Todo from '../model/todo.js'

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({})
    successHandle(res, todos)
  } catch (error) {
    errorHandle(res, 400)
  }
}

export const createTodo = async (req, res) => {
  try {
    const data = await handleChunk(req)
    const { title } = data

    if (title !== undefined) {
      const data = await Todo.create({ title })
      console.log(data)
      successHandle(res, data)
    } else {
      errorHandle(res, 400)
    }
  } catch (error) {
    errorHandle(res, 400)
  }
}