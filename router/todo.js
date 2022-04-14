const getAllTodoUrl = async (req) => {
  console.log(req.url === '/todos' && req.method === 'GET')
  return req.url === '/todos' && req.method === 'GET'
}
const createTodoUrl = async (req) => {
  return req.url === '/todos' && req.method === 'POST'
}
const deleteAllTodoUrl = async (req) => {
  return req.url === '/todos' && req.method === 'DELETE'
}
const deleteTodoUrl = async (req) => {
  return req.url.startsWith('/todos') && req.method === 'DELETE'
}
const updateTodoUrl = async (req) => {
  return req.url.startsWith('/todos') && req.method === 'PATCH'
}
const isOptions = async (req) => {
  return req.method === 'OPTIONS'
}

export {
  getAllTodoUrl,
  createTodoUrl,
  deleteAllTodoUrl,
  deleteTodoUrl,
  updateTodoUrl,
  isOptions
}