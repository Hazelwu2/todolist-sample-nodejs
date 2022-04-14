import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  title: String,
})

const Todo = mongoose.model('Room', todoSchema)
export default Todo