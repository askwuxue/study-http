const http = require('http');
const socket = require('socket.io');

let httpServer = http.createServer();

httpServer.listen(3000, () => {
    console.log('wesocket server is runing .....');
})

// socket 方法 listen 监听服务器
let wsServer = socket.listen(httpServer);
// 接受连接 建立连接
wsServer.on('connection', (sock) => {
    let timer = null;
    timer = setInterval(() => {
        sock.emit('serverPush', Math.random());
    }, 500)
    // 接受数据
    sock.on('a', (num) => {
        console.log(`接收到客户端的数据---··${num}·`);
        if(parseInt(num) === 0) {
            clearInterval(timer);
        }
    })
});