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
			<title>打包资源查看</title>
		</head>
		<body>
			<h1 >资源查看: ${data}</h1>
      <div id="app" ></div>
      <script type="text/javascript">
      let ws
      try {
        ws = new WebSocket('ws://127.0.0.1:8899');
              console.log(ws,'ws');
          } catch (err) {
         
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
            const msg = JSON.parse(evt.data);
            console.log(msg,'msg')
            if(msg.event==='configData'){
              document.title=msg.data.reportTitle  
            }
            if(msg.event==='compilationData'){
              let compilationArr=msg.data.split('')
              console.log(compilationArr,'compilationArr')
              box.innerHTML=msg.data


            } 
        };   
       

    </script>

		</body>

	</html>
	`
	return res.send(html)
})



async function startServer(compilation, opts) {
 
  const {
    analyzerPort = "",
    host = '',
    reportTitle = '',
  } = opts || {};
  app.listen({port:analyzerPort}, () => {
    console.log(`Example app listening at http://127.0.0.1:${analyzerPort}`)
  })
  
// http 应用用于打开页面  websocket 用于通讯
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
  })
    // 服务端websocket

  new Promise(resolve => {
    appPort=analyzerPort
    server.listen(analyzerPort, host, () => {
      const url = `http://${host}:${analyzerPort}`;
      
      open(url);
      resolve('')

    });
  }).then(()=>{
    
    const wss = new WebSocket.Server({port:8899})

    wss.on('connection', ws => {
      ws.on('error', err => {
        if (err.errno) return;
      });

      ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
    });
    
       ws.send(JSON.stringify({
        event: 'compilationData',
        data: new String(compilation)
      }))

      ws.send(JSON.stringify({
        event: 'configData',
        data: {reportTitle,analyzerPort}
      }))

   

  })
    
  })

  
}