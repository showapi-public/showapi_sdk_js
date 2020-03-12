>> 注: 该sdk内部使用jquery以及Promise
 对于基本数据类型, 例如字符串(包括base64),可以在实例化时,通过option一次性传入, 也可以用addTextPara方法一个个传入,
 对于文件对象, 仅能使用addFilePara传入

## 食用方式
```javascript
const instance = new jsSDK(options)
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
| addTextPara | 向option对象中添加非文件类型的值| name,value
| addFilePara | 向option对象中添加文件类型的值, 文件上传只能通过调用addFilePara方法传入, 尝试在option中传入是无效的| name,value
| fileToBase64 | 这是一个异步操作, 具体使用方式请查看demo, | file对象
| post | 以post的方法,发送options到指定的url地址,依赖jquery;返回jquery的defer对象,  | 接受一个对象,用于ajax,比如设置超时: post({timeout:2000})

## 在线demo


