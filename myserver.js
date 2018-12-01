var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/


  if(path === '/style.css'){
    /*response.statusCode = 200*/
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write('body{background-color:#ddd;}h1{color:red;}')
    response.end()
  }else if(path == '/main.js'){
    response.setHeader('Content-Type','text/javascript;charset=utf-8')
    /*如果没有这一行，只会把write()里面的内容打印出来，因为浏览器不知道这是什么*/
    /*如果要write出中文，则必须写明采用了utf-8编码，否则会乱码*/
    response.write('alert("这是JS执行的")\n')
    /*若alert外面是单引号，则里面最好用双引号，避免干扰*/
    response.end()
  }else if(path == '/'){
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write('<!DOCTYPE>\n<html>'+
      '<head><link rel="stylesheet"href="/style.css">'+
      '</head><body>'+
      '<h1>你好,Node.js</h1>'+
      '<script src="/main.js"></script>'+
      '</body></html>')
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


