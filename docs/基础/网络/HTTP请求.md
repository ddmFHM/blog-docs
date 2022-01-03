# HTTP请求

## HTTP 请求方法

- GET

- POST

- PUT

- DELETE

### HEAD

  本质和get一样，但是响应中没有呈现数据，而是http的头信息，主要用来检查资源或超链接的有效性或是否可以可达、检查网页是否被串改或更新，获取头信息等，特别适用在有限的速度和带宽下。

  HEAD 请求资源的头信息，信息与GET请求一致，但不包含响应体正文

  响应头可能包含 `Content-Length` 字段，描述的是相同情况下的 GET 请求返回的大小

  HEAD 请求可以被缓存，如果HEAD请求结果显示协商缓存失效了，则下一次的GET请求会重新请求资源

  - 可用于下载大文件前获取大小

### OPTION

  获取http服务器支持的http请求方法，允许客户端查看服务器的性能，比如ajax跨域时的预检等。

  - 用于获取后端支持的请求方式
  - 响应头中会包含一个`Allow`字段，表明支持的请求方式
  - `Allow: OPTION, GET, POST`

- 用于CORS预检请求（跨域问题处理）

  - 在CORS中，可以使用OPTION发起预检请求，来检测实际请求是否可以被服务器接收。

  - 复杂请求会发起预检请求，请求头包含字段
    - `Access-Control-Request-Methods`: 告知服务器实际请求使用的HTTP方法
    - `Access-Control-Request-Headers`: 告知服务器请求所携带的自定义头部字段
  
  - 服务器会返回响应，包含字段
    - `Access-Control-Allow-Methods`: 只用于CORS，返回允许的字段
    - `Access-Control-Allow-Headers`: 返回允许的自定义头部

### TRACE

  回显服务器收到的请求，主要用于测试或诊断。一般禁用，防止被恶意攻击或盗取信息。