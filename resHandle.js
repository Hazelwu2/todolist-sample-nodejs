export const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Aceess-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET POST OPTIONS DELETE PATCH'
}

export const successHandle = (res, data) => {
  res.writeHead(200, headers)
  res.write(JSON.stringify({
    status: 'success',
    data
  }))
  res.end()
}

export const errorHandle = (res, status) => {
  const errorText = {
    400: '格式錯誤或查無此 ID',
    404: '無對應路由'
  }

  res.writeHead(status, headers)
  res.write(JSON.stringify({
    status: 'error',
    message: errorText[status]
  }))
  res.end()
}
