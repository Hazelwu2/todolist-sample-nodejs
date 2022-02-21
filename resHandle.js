const headers = {
  'Content-Type': 'application/json',
  'Aceess-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Aceess-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET POST OPTIONS DELETE PATCH'
}

const successHandle = (res, data) => {
  res.writeHead(200, headers)
  res.write(JSON.stringify({
    status: 'success',
    data
  }))
  res.end()
}

const errorHandle = (res, status) => {
  const errorStatus = {
    400: '查無此欄位或格式錯誤',
    404: '查無對應路由'
  }
  res.writeHead(status, headers)
  res.write(JSON.stringify({
    status: 'error',
    message: errorStatus[status]
  }))
  res.end()
}

module.exports = {
  headers,
  successHandle,
  errorHandle
}