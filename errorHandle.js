function errorHandle(res, status, text) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE'
  }

  const statusText = {
    400: '欄位未填寫正確或無此 todo id',
    404: '無此路由',
    500: '伺服器發生錯誤'
  }

  res.writeHead(status, headers)
  res.write(JSON.stringify({
    status: 'error',
    message: statusText[status]
  }))
  res.end()
}

module.exports = errorHandle