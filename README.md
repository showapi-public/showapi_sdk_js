> 1. 注: 该sdk内部使用jquery以及Promise; 
 > 2. 对于基本数据类型, 例如字符串(包括base64),可以在实例化时,通过option一次性传入, 也可以用addTextPara方法一个个传入,
 >3. 对于文件对象, 仅能使用addFilePara传入

## 使用方式
```javascript
const instance = new jsSDK(option)
instance.post()
  .done(res){console.log(res)}
  .fail(err){console.log(err)}
```


## api

### option

| 参数| 说明| 类型| 默认值
|  -- | -- | -- | --|
|showapi_appid| 应用id| string| ''
|showapi_sign | 密钥| string | ''
| url | ajax时调用的url地址 | string|''
|...| 其他请求参数| any | -


### 实例方法

| 方法名 | 说明| 参数
|  -- | -- | -- | -- |
| addTextPara | 向option对象中添加非文件类型的请求参数| 第一个参数:参数名,第二个参数: 参数值|
| addFilePara | 向option对象中添加文件类型的请求参数, 文件上传只能通过调用addFilePara方法传入, 尝试在option中传入是无效的| 第一个参数:参数名,第二个参数: 参数值|
| fileToBase64 | 这是一个异步操作, 具体使用方式请查看demo, | file对象(比如input[type=file].files[0])|
| post | 以post的方法,发送options到指定的url地址,依赖jquery;返回jquery的defer对象,  | 接受一个对象,用于配置ajax,比如设置超时: post({timeout:2000})|

## demo

```html

<html>
<head>
  <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
</head>

<body>
  <form onsubmit="return false">
    <input type="text" name="username" value="aa" id="username">
    <input type="file" id="file">
    <button id="submit1">postBase64</button>
    <button id="submit2">postFile</button>
    <button id="submit3">postNormal</button>


  </form>
  <img src="" id="img">

  <script type="module">
    import jsSDK from './index.js' // 引入sdk

    $('#submit1').on('click', postBase64) // base64格式
    $('#submit2').on('click', postFile) //  文件上传
    $('#submit3').on('click', postNormal) // 普通文本


    // 上传base64数据, 测试接口: https://www.showapi.com/apiGateway/view/?apiCode=887&pointCode=4
    function postBase64() {
      var file = document.querySelector('#file').files[0]
      const instance = new jsSDK({
        url: 'https://route.showapi.com/887-4',
        showapi_appid: '',
        showapi_sign: '',
      })

      instance.fileToBase64(file).then(res => {
        instance.addTextPara('imgData', res)
        instance.post()
          .done(res1 => console.log(res1))
          .fail(err => console.log(err))
      })
    }

    // 上传文件,测试接口:https://www.showapi.com/apiGateway/view/?apiCode=887&pointCode=2
    function postFile() {
      var file = document.querySelector('#file').files[0]
      const instance = new jsSDK({
        url: 'https://route.showapi.com/887-2',
        showapi_appid: '',
        showapi_sign: '',
        handleImg: 0,
        // img:file //  此处传file对象是无效的!!! 文件对象只能通过调用addFilePara方法传入, 
      })

      instance.addFilePara('img', file)
      instance.post()
        .done(res1 => console.log(res1))
        .fail(err => console.log(err))
    }

    // 上传普通文本: 测试接口:https://www.showapi.com/apiGateway/view/?apiCode=887&pointCode=1
    function postNormal() {
      const instance = new jsSDK({
        url: 'https://route.showapi.com/887-1',
        showapi_appid: '',
        showapi_sign: '',
        content: '我是内容', // text文本可以在该处传入, 也可以使用addTextPara传入
      })

      instance.post()
        .done(res1 => {
          $('#img').get(0).src = res1.showapi_res_body.imgUrl
        })
        .fail(err => console.log(err))
    }


  </script>
</body>

</html>

```


