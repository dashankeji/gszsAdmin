const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  
    req.header("Access-Control-Allow-Origin", "*");
    req.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    req.header("Access-Control-Allow-Headers", "X-Requested-With");
    req.header('Access-Control-Allow-Headers', 'Content-Type');
    req.header("Content-Type", "application/json;charset=utf-8");
	  
	  if(req.url != '/'){
		 fs.readFile('./' + 'dist' + req.url,function(err,data){
			  if(err){
				  res.end('没有找到对应文件');
				  return;
			  };
			  res.end(data);
		 });
	  }else{
	  res.end('Hello World\n');
	  };
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});