const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTION, DELETE, PATCH'
}

const successHandle = (res, data) => {
  res.writeHead(200, headers)
  res.write(JSON.stringify({
    status: 'success',
    data: data
  }))
  res.end()
}

const errorHandle = (res, status) => {
  const errorText = {
    400: '查無此 id 或缺少欄位',
    404: '無對應路由',
  }

  res.writeHead(status, headers)
  res.write(JSON.stringify({
    status: 'error',
    message: errorText[status]
  }))
  res.end()
}

module.exports = {
  headers,
  successHandle,
  errorHandle
}