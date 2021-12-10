const http=require('http')
const open=require('opener')
const WebSocket = require('ws');
var app = require('express')();
const fs=require('fs')
// const  renderView=require('../client/render')

module.exports = {
  startServer

}

app.get('/', (req, res) => {
  res.send('hello 树哥' )
})

app.listen(8900, () => {
  console.log(`Example app listening at http://localhost:${8900}`)
})

async function startServer(compilation, opts) {
  const {
    analyzerPort = 8888,
    host = '127.0.0.1',
    // reportTitle = 'this is giao'
  } = opts || {};

 
console.log('abc');


// http 应用用于打开页面  websocket 用于通讯
  const server = http.createServer((req, res) => {
    // console.log('req',req);
    // console.log('res',res);
    res.writeHead(200, { 'Content-Type': 'text/html' })
    // console.log('compilation',compilation.assets);
    // const html=renderView(compilation,reportTitle
  })




  new Promise(resolve => {
    server.listen(analyzerPort, host, () => {
      const url = `http://${host}:${analyzerPort}`;
      console.log('浏览器启动le');
      
      open(url);
      resolve('')

    });
  }).then(()=>{

    console.log('test'); // 服务端websocket

    const wss = new WebSocket.Server(server)
    
    open(url);
    
    
    wss.on('connection', ws => {
      console.log('connection');
      
      ws.on('error', err => {
        // Ignore network errors like `ECONNRESET`, `EPIPE`, etc.
        console.log('err', err);
  
        if (err.errno) return;
  
      });

      ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
    });

      ws.send('world');

      return {
        ws: wss,
        http: server,
      };
    
    });

   
    
    
  })
  
}