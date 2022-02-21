# 部署 heroku
以下撰寫部署到 heroku nodejs application 前需要做的準備

## 編輯 package.json 
1. scripts 新增 start，設定跑 `node server.js`
``` json
"scripts": {
  "start": "node server.js",
},
```

2. 新增 engines，並指定 node 版本
```
"engines": {
  "node": "16.x"
}
```

3. server.listen PORT號須設定環境變數 `process.env.PORT`
heroku 會自行抓設置的環境變數，我們不需要另外在 .env 設定
``` js
const server = http.createServer(reqestListener)
server.listen(process.env.PORT || 10988)
```

以上三個步驟都設定完成後，即可開始部署
```
$ git push heroku master
$ heroku open
```