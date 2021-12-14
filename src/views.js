const http=require('http')
const open=require('opener')
const WebSocket = require('ws');
var app = require('express')();

module.exports = {
  startServer

}

app.use((req,res,next)=>{
  console.log('req,res',);
  next()
})


app.get('/', (req, res) => {
  res.set('Content-Type','text/html');

	const data = new Date();
	const html = `
	<html>
		<head>
			<title>资源查看大师</title>
		</head>
		<body>
			<h1 >login and now: ${data}</h1>
      <div id="app" ></div>
      <script type="text/javascript">
      
      try {
        ws = new WebSocket('ws://127.0.0.1:2048');
        console.log(ws,'ws');
    } catch (err) {
      console.warn(
        "Couldn't connect to analyzer websocket server so you'll have to reload page manually to see updates in the treemap"
      );
    }

        ws.onopen = function() {    
          alert("websocke 已经链接好了");    
          ws.send("I'm client");    
      };    
          
    
          
      ws.onclose = function() {    
          alert("Closed");    
      };    
          
      ws.onerror = function(err) {    
          alert("Error: " + err);    
      };
      var box = document.getElementById('app'); //获取 box
      ws.onmessage = function (evt) { 
        console.log(evt,'evt')
        box.innerHTML= JSON.stringify(evt.data)
 
     };   

    </script>

		</body>

	</html>
	`
	return res.send(html)
})

app.listen({port:8900}, () => {
  console.log(`Example app listening at http://localhost:${8900}`)
})

async function startServer(compilation, opts) {
  console.log('compilation');
  
  const {
    analyzerPort = 8888,
    host = '127.0.0.1',
    reportTitle = 'this is giao',
    WebSocketPort=2048
  } = opts || {};

// http 应用用于打开页面  websocket 用于通讯
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
  })
    // 服务端websocket

  new Promise(resolve => {
    server.listen(analyzerPort, host, () => {
      const url = `http://${host}:${analyzerPort}`;
      
      open(url);
      resolve('')

    });
  }).then(()=>{
    
    const wss = new WebSocket.Server({port:WebSocketPort})
    wss.on('connection', ws => {
      ws.on('error', err => {
        if (err.errno) return;
      });

      ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
    });
    console.log('compilation',compilation);
    
    
       ws.send(compilation+'');
      return {
        ws: wss,
        http: server,
      };
  })
    
  })

  
}