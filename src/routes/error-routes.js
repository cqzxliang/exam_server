// module.exports = function () {
//   return function (ctx, next) {
//     switch (ctx.status) {
//       case 404:
//         ctx.body = '没有找到内容 - 404'
//         break
//     }
//     return next()
//   }
// }

module.exports = function () {
  return function (ctx, next) {
    switch (ctx.status) {
    case 404:
      ctx.body = `<html>
        <head>
        <title>Welcome to nginx!</title>
        <style>
            body {
                width: 35em;
                margin: 0 auto;
                font-family: Tahoma, Verdana, Arial, sans-serif;
            }
        </style>
        </head>
        <body>
        <h1>Welcome to nginx!</h1>
        <p>If you see this page, the nginx web server is successfully installed and
        working. Further configuration is required.</p>
        
        <p>For online documentation and support please refer to
        <a href="http://nginx.org/">nginx.org</a>.<br/>
        Commercial support is available at
        <a href="http://nginx.com/">nginx.com</a>.</p>
        
        <p><em>Thank you for using nginx.</em></p>
        <a style="position:absolute;bottom:2%;left:40%;" href="http://www.miitbeian.gov.cn">粤ICP备17145557号</a>
        </body>
        </html>
        `
      break
    }
    return next()
  }
}