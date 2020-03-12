
 export default class jsSDK{
  constructor(config){
    const {url,...option} = config
    this.url = url
    this.hasFile = false
    this.option = option // 仅含非文件
    this.fileOption = {}
  }

   addTextPara(name,value){
    this.option = {...this.option, [name]:value}
  }
   addFilePara(name,file){
     if(!file){
       return error('未收到file对象, 你是不是没选择文件')
     }
    this.hasFile = true
    this.fileOption = {...this.fileOption,[name]:file } 
  }

  fileToBase64(file){
    console.log('base64', file);
    return new Promise((resolve, reject)=>{
         let reader = new FileReader()
    
      reader.addEventListener('load',function (e){
        resolve( e.target.result)
        
      },false)
    
      if (file) {
        reader.readAsDataURL(file);
        
      }else{
        error('请为fileToBase64函数传入file对象')
      }
    })
    }
    
  /**
     * 把非文件对象和文件对象append到FormData对象内
     */
    generateFormData(){
      let formDataInstance = new FormData()
     const mergedOption = {...this.option, ...this.fileOption}
      for(let [k,v] of Object.entries(mergedOption)){
        formDataInstance.append(k,v)
        }
        return formDataInstance
  }

  post(cfg){

    if(!$){
      return error('依赖于jquery, 请为该sdk所在作用域提供$变量')
    }
    
    let data = this.hasFile ? this.generateFormData() : this.option
    return $.ajax({
      url: this.url,
      type: "post",
      dataType: "json",
      data: data,
      processData: !this.hasFile,  // 告诉jQuery不要去处理发送的数据
      contentType: this.hasFile ? false : 'application/x-www-form-urlencoded',  // 告诉jQuery不要去设置Content-Type请求头
      ...cfg
    })
   
  }
}



function error(msg){
  console.error(msg)
}
