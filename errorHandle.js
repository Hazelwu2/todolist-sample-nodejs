const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PATCH'
}

const errorHandle = (res, status) => {

  const statusText = {
    400: '查無此id或缺少欄位',
    404: '無對應路由',
    500: '伺服器發生錯誤'
  }

  res.writeHead(status, headers)
  res.write(JSON.stringify({
    status: 'error',
    message: statusText[status]
  }))
  res.end()
}

const successHandle = (res, data = []) => {
  res.writeHead(200, headers)
  res.write(JSON.stringify({
    status: 'success',
    data
  }))
  res.end()
}

module.exports = {
  headers,
  errorHandle,
  successHandle
}