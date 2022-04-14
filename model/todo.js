import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  title: String,
}, { versionKey: false })

const Todo = mongoose.model('Room', todoSchema)
export default Todo