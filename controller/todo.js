import {
  handleChunk,
  handleUrl
} from '../utils/tool.js'
import { successHandle, errorHandle } from '../resHandle.js'
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

export const deleteAllTodo = async (req, res) => {
  try {
    await Todo.deleteMany({})
    successHandle(res, [])
  } catch (error) {
    console.log(error)
    errorHandle(res, 400)
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const _id = await handleUrl(req)
    const data = await Todo.findOneAndDelete({ _id })

    if (!data) {
      errorHandle(res, 400)
      return
    }

    successHandle(res, data)

  } catch (error) {
    console.log(error)
    errorHandle(res, 400)
  }
}
export const updateTodo = async (req, res) => {
  try {
    const { title } = await handleChunk(req)
    console.log(title)
    if (!title) errorHandle(res, 400)

    const _id = await handleUrl(req)
    const data = await Todo.findByIdAndUpdate(
      { _id },
      { title }
    )

    if (!data) {
      errorHandle(res, 400)
      return
    }
    successHandle(res, { title })

  } catch (error) {
    errorHandle(res, 400)
    console.log(error)
  }

}
export const options = async (req, res) => {
  try {
    successHandle(res, [])
  } catch (error) {
    console.log(error)
  }
}