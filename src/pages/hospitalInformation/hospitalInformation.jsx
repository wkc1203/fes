import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Icon, Popover, Modal, Upload, message, Input, Select, DatePicker } from 'antd';
import * as utils from '../../utils/utils';
import moment from 'moment';
import './style.less';
import img from '../../resources/images/sjkk@2x.png'
import E from 'wangeditor'
import * as service from './service';
var imgList = '';
var imgLists = [];
var uuList = [];
const confirm = Modal.confirm;
const {RangePicker} = DatePicker
const content = (
  <div>数字越大越靠前</div>
);

class Information extends React.Component {
  state = {
    hospital:{},
    src: null,
    imgArr: '',
    imgArrs:[],
    expire: '',
    imgList: '',
    sign: {},
    name:'',//名称
    level:'',//等级
    licence:'',//执业许可证
    serviceScope:'',//服务范围
    editorContent:'',//荣誉奖项
    honorImages:'',//荣誉奖项
    instCode:'',//医疗机构代码
    instRegisterNumber:'',//医疗机构执业许可证登记号
    instInfoSafeEnsure:'',//医疗机构信息安全等保证号
    certFirstName:'',//首次获证时间
    certUpdateName:'',//证件更新时间
    licenseStartName:'',//执业许可标志开始时间
    licenseEndName:''//执业许可标志结束时间
  }
  /*获取oss 签名*/

  //富文本
  componentDidMount() {
    utils.request('/api/ehis/health/api/file/sign', {
        method: 'POST',
        body: utils.jsonToQueryString({bucket: 'ihoss',dir: "PIC"}),
      }).then((res)=>{
        console.log(res,'sdasda')
         let sign = JSON.stringify(res.data.data)
         sessionStorage.setItem('sign',sign)       
    })
    //const signs = JSON.parse(sessionStorage.getItem('sign'))
    const elemMenu = this.refs.editorElemMenu;
    const elemBody = this.refs.editorElemBody;
    const editor = new E(elemMenu, elemBody)
    console.log('111111',this.refs)
    this.setState({
      editor:editor,
    })
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      //console.log(editor.txt.html(), editor.txt.text())
     
      this.setState({
        editorContent: editor.txt.html()
      })
      console.log("ee",this.state.editorContent)
      this.changeDet({honorImages:this.state.editorContent})
      //this.changeDet({editorContent: this.state.editorContent})
    }
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'foreColor',  // 文字颜色
      'list',  // 列表
      'justify',  // 对齐方式
      'image',  // 插入图片
      'undo',  // 撤销
      'redo'  // 重复
    ]
    editor.customConfig.showLinkImg = false
    //editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.uploadImgTimeout = 50000;
    //editor.customConfig.uploadImgServer = 'https://ihoss.oss-cn-beijing.aliyuncs.com/'
   // editor.customConfig.uploadImgMaxLength = 3
    //editor.customConfig.uploadFileName = 'file'

    const thats = this
    editor.customConfig.customUploadImg = function (files, insert) {
      for (var i = 0; i < files.length; i++) {
        console.log(thats.state.imgList, 'a132')
        const formData = new FormData();
        var filename = '';
        var image = [];
        var myDate = new Date();
        var ossPath = 'PIC/';
        var fileRandName = Date.now();
        var year = myDate.getFullYear();
        var month;
        var day;
        if (myDate.getMonth() + 1 < 10) {
          var m = myDate.getMonth() + 1;
          month = '0' + m;
        } else {
          month = myDate.getMonth() + 1;
        }
        if (myDate.getDate() < 10) {
          var d = myDate.getDate() + 1;
          day = '0' + d;
        } else {
          day = myDate.getDate();
        }
        var base64 = '';
        var reader = new FileReader();//创建一个字符流对象
        reader.readAsDataURL(files[i]);//读取本地图片
        reader.onload = function (e) {
          base64 = this.result;
          var date = new Date().getTime();
          var m = ossPath + year + '/' + month + '/' + day + "/";
          var S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          var uuid = S4 + S4 + "-" + S4 + "-" + S4 + "-" + S4 + "-" + S4 + S4 + S4;
          var filename = thats.randomName() + uuid + '.png';
          formData.append('key', filename);
          formData.append("policy",  JSON.parse(sessionStorage.getItem('sign')).policy);
          formData.append("callback",  JSON.parse(sessionStorage.getItem('sign')).callback);
          formData.append("signature",  JSON.parse(sessionStorage.getItem('sign')).sign);//c+ifaILA5Szla7Buicnm94BQ8uw=
          formData.append("OSSAccessKeyId",  JSON.parse(sessionStorage.getItem('sign')).accessId);
          formData.append('file', thats.base64ToBlob(base64));
          $.ajax({
            url: 'https://ihoss.oss-cn-beijing.aliyuncs.com',
            method: 'POST',
            processData: false,
            contentType: false,
            cache: false,
            data: formData,
            success: (e) => {
              imgLists.unshift('https://ihoss.oss-cn-beijing.aliyuncs.com/'+filename);
              if (thats.isHasImg('https://ihoss.oss-cn-beijing.aliyuncs.com/' + filename)) {
                thats.setState({
                    imgArrs:Array.from(new Set(imgLists))
                }, () => { console.log(thats.state.imgArrs, 'a1321'); insert(thats.state.imgArrs[0])});
              } else {
                var intervals = setInterval(() => thats.isHas('https://ihoss.oss-cn-beijing.aliyuncs.com/' + filename, imgList), 500);
                thats.setState({
                  intervals: intervals
                })
              }

            },
          });
        };
      }
  }

    editor.create();
    utils.request('/api/mch/health/hospital/get/hisId', {
      method: 'POST',
      body: utils.jsonToQueryString({hisId: sessionStorage.getItem("hisId")}),
    }).then((res)=>{
      console.log(res.data.data,'sdasda') 
      editor.txt.html(res.data.data?res.data.data.honorImages:'<p></p>')  
    })
  };


  /*文件目录*/
  randomName() {
    var myDate = new Date();
    var ossPath = 'PIC/';
    var fileRandName = Date.now();
    var year = myDate.getFullYear();
    var month;
    var day;
    if (myDate.getMonth() + 1 < 10) {
      var m = myDate.getMonth() + 1;
      month = '0' + m;
    } else {
      month = myDate.getMonth() + 1;
    }
    if (myDate.getDate() < 10) {
      var d = myDate.getDate() + 1;
      day = '0' + d;
    } else {
      day = myDate.getDate();
    }
    var date = new Date().getTime();
    var m = ossPath + year + '/' + month + '/' + day + "/";
    uuList[0] = m;
    return m;
  }

  base64ToBlob(urlData) {
    var arr = urlData.split(',');
    var ua = navigator.userAgent.toLowerCase();//获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);//判断是否是苹果手机，是则是true
    var mime = '';
    var bytes;

    mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
    bytes = window.atob(arr[1]);

    // 去掉url的头，并转化为byte
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mime
    });
  }
  isHasImg(url) {
    var xmlHttp;
    if (window.ActiveXObject) {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    }
    xmlHttp.open("Get", url, false);
    xmlHttp.send();
    if (xmlHttp.status == 404)
      return false;
    else
      return true;
  }
  //医疗机构执业许可证上传
  onChange = (files, file, index) => {
    var that = this;
    if (!!file) {
      console.log(files, file, index)
      this.setState({
        files,
      });
      var that = this;
      var sign = that.state.sign;

      for (var i = 0; i < files.length; i++) {
        console.log(this.state.imgList, '132')
        const formData = new FormData();
        var filename = '';
        var image = [];
        var myDate = new Date();
        var ossPath = 'PIC/';
        var fileRandName = Date.now();
        var year = myDate.getFullYear();
        var month;
        var day;
        if (myDate.getMonth() + 1 < 10) {
          var m = myDate.getMonth() + 1;
          month = '0' + m;
        } else {
          month = myDate.getMonth() + 1;
        }
        if (myDate.getDate() < 10) {
          var d = myDate.getDate() + 1;
          day = '0' + d;
        } else {
          day = myDate.getDate();
        }
        var base64 = '';
        var that = this;
        var reader = new FileReader();//创建一个字符流对象
        reader.readAsDataURL(files[i]);//读取本地图片
        reader.onload = function (e) {
          base64 = this.result;
          var date = new Date().getTime();
          var m = ossPath + year + '/' + month + '/' + day + "/";
          var S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          var uuid = S4 + S4 + "-" + S4 + "-" + S4 + "-" + S4 + "-" + S4 + S4 + S4;
          var filename = that.randomName() + uuid + '.png';
          formData.append('key', filename);
          formData.append("policy", that.props.sign.policy);
          formData.append("callback", that.props.sign.callback);
          formData.append("signature", that.props.sign.sign);//c+ifaILA5Szla7Buicnm94BQ8uw=
          formData.append("OSSAccessKeyId", that.props.sign.accessId);
          formData.append('file', that.base64ToBlob(base64));
          $.ajax({
            url: 'https://ihoss.oss-cn-beijing.aliyuncs.com',
            method: 'POST',
            processData: false,
            contentType: false,
            cache: false,
            data: formData,
            success: (e) => {
              //imgList.unshifwt('https://ihoss.oss-cn-beijing.aliyuncs.com/'+filename);
              imgList = ('https://ihoss.oss-cn-beijing.aliyuncs.com/' + filename);
              if (that.isHasImg('https://ihoss.oss-cn-beijing.aliyuncs.com/' + filename)) {
                that.setState({
                  // imgArr:Array.from(new Set(imgList))
                  imgArr: imgList
                });
                that.changeDet({licence:imgList})
              } else {
                var intervals = setInterval(() => that.isHas('https://ihoss.oss-cn-beijing.aliyuncs.com/' + filename, imgList), 500);
                that.setState({
                  intervals: intervals
                })
              }
            },
            error: (e) => {

            }
          });
        };
      }
    }
  };
  
  cancel = ()=>{
    //location.reload()
    history.go(0)
    }

    changeDet=(payload)=>{
      const {dispatch} = this.props
      dispatch({
        type: 'information/changeDet',
        payload,
      });
    }
  //提交医院信息
  submit = () => {
    const { dispatch} = this.props
    const {} = this.state
    //const { name, level, serviceScope, imgArr,editorContent, instCode, instRegisterNumber, instInfoSafeEnsure, certFirstName, certUpdateName, licenseStartName, licenseEndName } = this.state
    const { name, honorImages, serviceScope, level,licence,imgArr, instCode, instRegisterNumber, instInfoSafeEnsure, certFirstName, certUpdateName, licenseStartName, licenseEndName } = this.props.hospitalInformation
     console.log("d11",serviceScope)
    if (!name||name.replace(/(^\s*)|(\s*$)/g, "")=='') { message.warning('请输入医疗机构名称', 2); return false; }
    if (!level||level=='') { message.warning('请选择医院等级', 2); return false; }
    if (!licence||licence.replace(/(^\s*)|(\s*$)/g, "")=='') { message.warning('请上传执业许可证', 2); return false; }
    if (!serviceScope||serviceScope.replace(/(^\s*)|(\s*$)/g, "")=='') { message.warning('请输入互联网诊疗服务范围', 2); return false; }
    if (!honorImages||honorImages.length<15) { message.warning('请输入医院奖惩信息', 2); return false; }  
    const payload = {
            hisId: sessionStorage.getItem("hisId"),
            name,//名称
            level,//等级
            licence,//执业许可证
            serviceScope,//服务范围
            honorImages,//荣誉奖项
            instCode:instCode?instCode:'',//医疗机构代码
            instRegisterNumber:instRegisterNumber?instRegisterNumber:'',//医疗机构执业许可证登记号
            instInfoSafeEnsure:instInfoSafeEnsure?instInfoSafeEnsure:'',//医疗机构信息安全等保证号
            certFirstDate:certFirstName?certFirstName+' 00:00:00':'',//首次获证时间
            certUpdateDate:certUpdateName?certUpdateName+' 00:00:00':'',//证件更新时间
            licenseStartDate:licenseStartName?licenseStartName+' 00:00:00':'',//执业许可标志开始时间
            licenseEndDate:licenseEndName?licenseEndName+' 00:00:00':''//执业许可标志结束时间
    }
    if(this.props.hospitalInformation.id){
      payload.id =this.props.hospitalInformation.id
          dispatch({
          type: 'information/add',
          payload:payload
        })
      }else{
        dispatch({
          type: 'information/add',
          payload:payload
        })
      }   
  }
  render() {
    const dateFormat = 'YYYY-MM-DD';
    var start=this.props.hospitalInformation&&this.props.hospitalInformation.licenseStartDate?this.props.hospitalInformation.licenseStartDate:'';
    var end=this.props.hospitalInformation&&this.props.hospitalInformation.licenseEndDate?this.props.hospitalInformation.licenseEndDate:'';
    const {hospitalInformation} = this.props
    console.log(hospitalInformation,'123')
    console.log(this.props.hospitalInformation.honorImages)
    //背景图
    const bgGround = {
      display: 'inline-block',
      backgroundImage: 'url(' + img + ')',  //图片的路径
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    };

    return (
      <div className='information'>
        <div className='phone' style={bgGround}>
          <img className='image1' src='../../images/zgyd.png'/>
          <img className='image2' src='../../images/dl.png'/>
          <div className='phones'>
            <div className = 'title'> 
              <img src='../../images/gb.png'/>
              <p>重庆儿童医院咨询平台</p> 
              <img src='../../images/an.png'/>
            </div>
            <div className="home"><img src='../../images/fhjt.png'/> 医院信息</div>
            <div className='contents'>
            <div className='essentialInformation'>
              <p><span>医疗机构名称</span><span>{!!this.props.hospitalInformation&&!!this.props.hospitalInformation.name?this.props.hospitalInformation.name:'暂无信息'}</span></p>
              <p><span>医疗机构等级等次</span><span>{!!this.props.hospitalInformation&&!!this.props.hospitalInformation.grading?this.props.hospitalInformation.grading:'暂无信息'}</span></p>
              <p>
                <span>医疗机构执业许可证书</span>
                <img src={!!this.props.hospitalInformation&&!!this.props.hospitalInformation.licence?this.props.hospitalInformation.licence:'../../images/4975e854c9e0b892c900ee6471922ac.png'} alt="" />
              </p>
            </div>

            <div className='rang'>
              <p>互联网诊疗服务范围（科目/病种）</p>
              <p>{!!this.props.hospitalInformation&&!!this.props.hospitalInformation.serviceScope?this.props.hospitalInformation.serviceScope:'暂无信息'}</p>
            </div>
            <div className='certificate'>
              <p className = 'ry'>荣誉奖项</p>
              <div dangerouslySetInnerHTML={{__html:!!this.props.hospitalInformation&&!!this.props.hospitalInformation.honorImages?this.props.hospitalInformation.honorImages:'<p>暂无信息</p>'}}></div>
            </div>
            </div>
          </div>
        </div>
           
        <div className='addInformation'>

          <p><span><i>*</i>医疗机构名称</span> <Input placeholder='请输入医疗机构名称' value={!!this.props.hospitalInformation&&!!this.props.hospitalInformation.name?this.props.hospitalInformation.name:''}  onChange={(e) => {this.changeDet({name:e.target.value}); this.setState({ name: e.target.value }) }} /></p>
          <p><span><i>*</i>医疗机构等级层次 </span>
            <Select
              labelInValue
              style={{ width: '68%', marginLeft: '13px' ,height:'32px'}}
              placeholder={!!this.props.hospitalInformation&&!!this.props.hospitalInformation.grading?this.props.hospitalInformation.grading:'请选择医疗机构等级层次'}

              onChange={(value) => {console.log(value,'54sa'); this.setState({ level: value.key,grading:value.label });this.changeDet({level:value.key,grading:value.label}) }}
            >
              <Option value="13">一级甲等</Option>
              <Option value="12">一级乙等</Option>
              <Option value="11">一级丙等</Option>
              <Option value="23">二级甲等</Option>
              <Option value="22">二级乙等</Option>
              <Option value="21">二级丙等</Option>
              <Option value="34">三级特等</Option>
              <Option value="33">三级甲等</Option>
              <Option value="32">三级乙等</Option>
              <Option value="31">三级丙等</Option>
              
            </Select>
          </p>
          <div className='zs'>
            <span><i>*</i>医疗机构执业许可证</span>
            <div className = 'zs1'>
              <p className='upload'>
                <img src='../../images/xp@2x.png' />
                <input type="file" id="file" onChange={(e) => {
                  this.onChange(e.target.files, e.target.files[0], 0)
                }} accept="image/*" />
                <b>点击上传图片</b>
                <b>支持jpg/jpeg/png等多种格式，单张最大支持10M</b>
              </p>
              {!!this.props.hospitalInformation&&!!this.props.hospitalInformation.licence?<p className='add'>
              <img src={this.props.hospitalInformation.licence} />
            </p>:''}
            </div>
          </div>

          <p>
            <span><i>*</i>互联网诊疗服务范围</span> <textarea placeholder='请输入互联网诊疗服务范围的科室/病种等信息'
              value={!!this.props.hospitalInformation&&!!this.props.hospitalInformation.serviceScope?this.props.hospitalInformation.serviceScope:''}
              onChange={(e) => {this.changeDet({serviceScope:e.target.value}); this.setState({ serviceScope: e.target.value }) }} />
          </p>
          <div><span><i>*</i>医疗机构奖惩信息</span>
            <div className="shop" style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '16px' ,marginBottom:'10px'}}>
              <div className="text-area" style={{ display: 'inline-block' }}>
                <div ref="editorElemMenu"
                  style={{ border: "1px solid #ccc",  }}
                  className="editorElem-menu">
                </div>
                <div
                  style={{
                    padding: "0 10px",
                    overflowY: "scroll",
                    height: 180,
                    border: "1px solid #ccc",
                    borderTop: "none"
                  }}
                  ref="editorElemBody" className="editorElem-body">
                </div>
              </div>
            </div>
          </div>
          <p><span>医疗机构代码</span> <Input  placeholder='请输入医疗机构代码'
          value={!!this.props.hospitalInformation&&!!this.props.hospitalInformation.instCode?this.props.hospitalInformation.instCode:''}
           onChange={(e) => { this.changeDet({instCode:e.target.value})}} 

           onBlur = {(e)=>{ if(!/^[A-Z0-9]{18}$/.test(e.target.value)){
            message.info('请填写正确医疗机构代码（大写字母加数字18位）');
           }else{this.setState({ instCode: e.target.value }) }}}
           /></p>
          <p><span>医疗机构执业许可证登记号</span> <Input placeholder='请输入医疗机构执业许可证登记号'
           onChange={(e) => { this.changeDet({instRegisterNumber:e.target.value})}}  
           value={!!this.props.hospitalInformation&&!!this.props.hospitalInformation.instRegisterNumber?this.props.hospitalInformation.instRegisterNumber:''}
           onBlur = {(e)=>{ if(!/^\d{18}$/.test(e.target.value)){
            message.info('请填写18位数字的执业许可证登记号');
           }else{this.setState({ instRegisterNumber: e.target.value }) }}}
           />
          </p>
          <div className = 'choosetime'>
            <span style={{paddingTop:'4px'}}>首次获证时间</span> <div className = 'choosetime1'>
            {!!this.props.hospitalInformation.certFirstDate&&<DatePicker 
            defaultValue={moment(this.props.hospitalInformation.certFirstDate, dateFormat)}
            onChange={(date, dateString) => {
              this.changeDet({certFirstName:dateString});
              this.setState({ certFirstName: dateString }) }} />}
              {!this.props.hospitalInformation.certFirstDate&&<DatePicker 
                onChange={(date, dateString) => {
                  this.changeDet({certFirstName:dateString});
                  this.setState({ certFirstName: dateString }) }} />}
                  
            <p className = 'time'><span className='sspan'>证件更新时间</span> 
            {!!this.props.hospitalInformation.certUpdateDate&&<DatePicker
             defaultValue={moment(this.props.hospitalInformation.certUpdateDate, dateFormat)}
             onChange={(date, dateString) => {
             this.changeDet({certUpdateName:dateString});
             this.setState({ certUpdateName: dateString }) }} />}
             {!this.props.hospitalInformation.certUpdateDate&&<DatePicker
              onChange={(date, dateString) => {
              this.changeDet({certUpdateName:dateString});
              this.setState({ certUpdateName: dateString }) }} />}
             </p></div>
          </div>
         

          <p><span>医疗机构信息安全等保证号</span> <Input value={!!this.props.hospitalInformation&&!!this.props.hospitalInformation.instInfoSafeEnsure?this.props.hospitalInformation.instInfoSafeEnsure:''} placeholder='请输入医疗机构信息安全等保障号' onChange={(e) => {this.changeDet({instInfoSafeEnsure:e.target.value}); this.setState({ instInfoSafeEnsure: e.target.value }) }} /></p>
          <p className='zyxk'>
             <span style={{marginRight:'5px'}}>执业许可标志有效期</span> 
             {console.log("d",start)}
             {!!start&&<RangePicker 
              style={{width:'200px'}}
             defaultValue={[moment(start,dateFormat), moment(end,dateFormat)]}
             format={dateFormat}

              onChange={(data,dataString)=>{
               this.changeDet({licenseStartName:dataString[0],licenseEndName:dataString[1]})
               this.setState({licenseStartName:dataString[0],licenseEndName:dataString[1]})} }/>}
               {!start&&<RangePicker 
                format={dateFormat}
                style={{width:'200px'}}
                 onChange={(data,dataString)=>{
                  this.changeDet({licenseStartName:dataString[0],licenseEndName:dataString[1]})
                  this.setState({licenseStartName:dataString[0],licenseEndName:dataString[1]})} }/>}
          </p>
          <div className='sub'>
            <button onClick = {()=>{this.cancel()}} >取消</button>
            <button onClick={() => { this.submit() }}> 保存</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  const { information } = state;
  return {
    ...information,
  };
})(Information);
