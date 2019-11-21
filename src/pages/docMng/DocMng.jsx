import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Icon,Switch, Checkbox, DatePicker,InputNumber, Modal, Upload, message, Input,Select,Drawer } from 'antd';
import { formatDate } from '../../utils/utils';
import './style.less';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const {RangePicker} = DatePicker
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;
const confirm = Modal.confirm;
import "cropperjs/dist/cropper.css";
import Cropper from 'react-cropper';
const content = (
  <div>数字越大越靠前</div>
);

class DocMng1 extends React.Component {
  state = {
    ids: [],
    name: '',
    pageNum:'',
    deptName:'',
    showDetail:false,
    showModal:false,
    status:'',
    isOnDuty: true,
    isOnDuty1: true,
    isStatus:true,
    hideMobile:'',
    show:false,
    showMore:false,
    src: null,
    img:'',
    selectedImageFile:'',
    editImageModalVisible:'',
  }
  componentDidMount(){
    this.query(1);
  }
  showMobile= (phone)=>{
    if(phone==''){
      this.setState({
        show:true
      })
    }
}
changeDet = (payload) => {
  const { dispatch } = this.props;
  dispatch({
    type: 'docMng1/changeDet',
    payload,
  });
}
changeDet1 = () => {
  document.getElementById('mobile').value='';
}
changeSer1 = (checked) => {
  this.setState({isOnDuty: checked});
  this.changeDuty(false, 1);
  this.changeDuty(false, 2);
}
changeStatus = () => {
 // this.setState({ isStatus: !this.state.isStatus });
  if(this.props.detail.status=='1'){
    this.changeDet({status:'2'});
  }else{
    this.changeDet({status:'1'});
  }
}
changeSer = () => {
  this.setState({ isOnDuty1: !this.state.isOnDuty1 });
  if(this.state.isOnDuty1){
      const {dispatch}=this.props;
      dispatch({
          type: 'docMng1/changeRef',
          payload:{reviewAdmin:'0',reviewDoctor:''},
      });

  }

}
changeDuty = (checked, type) => {
const { dispatch } = this.props;
if (type == 1) {
  dispatch({
    type: 'docMng1/changegraphic',
    payload: {isOnDuty: checked ? 1 : 0},
  });
}
if (type == 2) {
  dispatch({
    type: 'docMng1/changevideo',
    payload: {isOnDuty: checked ? 1 : 0},
  });
}
if (type == 3) {
  dispatch({
    type: 'docMng1/changeradio',
    payload: {isOnDuty: checked ? 1 : 0},
  });
}
}
changeDuty1 = (type) => {
  if(!!this.props.referral&&!!this.props.referral){
      if(type==1){
          const { dispatch } = this.props;
           var value=!!this.props.referral.reviewAdmin?this.props.referral.reviewAdmin:'';
           if(value=='1'){
               value='0';
           }else{
              value='1';
           }
          var payload={reviewAdmin:value};
          dispatch({
              type: 'docMng1/changeRef',
              payload,
          });
      }
      if(type==2){
          const { dispatch } = this.props;
          var value=!!this.props.referral.reviewDoctor?this.props.referral.reviewDoctor:'';
           if(value=='3'){
               value='2';
           }else{
               if(value=='2'){
                  value='3';
               }else{
                   if(value=='1'){
                      value='';
                   }else{
                      value='1';
                   }
                      
               }
           }
          var payload={reviewDoctor: value };
          dispatch({
              type: 'docMng1/changeRef',
              payload,
          });
      }
      if(type==3){
          const { dispatch } = this.props;
          var value=!!this.props.referral.reviewDoctor?this.props.referral.reviewDoctor:'';
          if(value=='3'){
              value='1';
          }else{
              if(value=='1'){
                 value='3';
              }else{
                  if(value=='2'){
                      value='';
                  }else{
                      value='2';
                  }
                 
              }
          }
          var  payload={reviewDoctor: value };
          dispatch({
              type: 'docMng1/changeRef',
              payload,
          });
      }
  }else{
      if(type==1){
          const { dispatch } = this.props;
          var payload={reviewAdmin:'1'};
          dispatch({
              type: 'docMng1/changeRef',
              payload,         
          });
      }
      if(type==2){
          const { dispatch } = this.props;
          var payload={reviewDoctor: '1' };
          dispatch({
              type: 'docMng1/changeRef',
              payload,
          });
      }
      if(type==3){
          const { dispatch } = this.props;
          var  payload={reviewDoctor: '2' };
          dispatch({
              type: 'docMng1/changeRef',
              payload,
          });        
      }
  }
  console.log("pprop",this.props)
}
changeMoney = (v, type) => {
  if (/^\d+(\.\d{0,2})?$/.test(v) || v === '') {
    const { dispatch } = this.props;
    if (type == 1) {
      dispatch({
        type: 'docMng1/changegraphic',
        payload: {remune: v},
      });
    }
    if (type == 2) {
      dispatch({
        type: 'docMng1/changevideo',
        payload: {remune: v},
      });
    }
    if (type ==3) {
      dispatch({
        type: 'docMng1/changeradio',
        payload: {remune: v},
      });
    }
  }
}
beforeUpload = (file) => {
  console.log("f",file);
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(file.name)) {
    return true;
  } else {
    message.warning('请选择正确格式的图片文件上传', 2);
    return false;
  }
}
beforeUpload1 = (file) => {
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(file.name)) {
    return true;
  } else {
    message.warning('请选择正确格式的图片文件上传', 2);
    return false;
  }
}
fileChange1 = (info) => {
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(info.file.name)) {
    this.setState({fileList1: [info.file]});
  }
  if (info.file.status === 'done') {
    if (info.file.response.code === 0) {
      message.success(info.file.response.msg, 2);
      this.changeDet({circleImage: info.file.response.data});
      this.setState({showModal1: false, fileList1: []});
    } else if (info.file.response.code === 999) {
      message.error(info.file.response.msg, 3, () => hashHistory.push({pathname: '/login'}));
    } else {
      message.error(info.file.response.msg);
    }
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败`);
  }
}
fileChange = (info) => {
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(info.file.name)) {
    this.setState({fileList: [info.file]});
  }
  if (info.file.status === 'done') {
    if (info.file.response.code === 0) {
      message.success(info.file.response.msg, 2);
      var image=new Image();
      image.src = info.file.response.data;
      var Img=new Image();
       Img.src = info.file.response.data;
       console.log("image",image.width,image.height)
      if (image.width < 1200&& image.height < 1340) {
        Img.width = 1200;   //以框的宽度为标准
        Img.height =1340;
      }else{
          if (1200/ 1340  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
          {
              Img.width = 1200;   //以框的宽度为标准
              Img.height =1340
          } 
          else {   //原图片宽高比例 小于 图片框宽高比例
              Img.width = 1200;
              Img.height = 1340  ;   //以框的高度为标准
          }

      }
      console.log("img",Img);
      console.log("image",Img.width,Img.height)
      

      this.changeDet({image: Img.src});
      

      this.setState({showModal1: false, fileList: []});
    } else if (info.file.response.code === 999) {
      message.error(info.file.response.msg, 3, () => hashHistory.push({pathname: '/login'}));
    } else {
      message.error(info.file.response.msg);
    }
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败`);
  }
}
cancelModal=()=>{
  this.setState({
    showModal:false
  })
}
submit = () => {
  const { dispatch } = this.props;
  const {image ,name, hisDoctorName,doctorId, workingLife,deptId, deptName,mobile,idNumber,auditTime,practiceMedicalInstitution,
    practiceLevel,title,level, prescriptionQualification, policyNumber,
    underwritingUnit,insuranceStartDate,insuranceEndDate, category,deptmentId,practiceNumber,practiceScope,
    startValidDate,endValidDate,deptmentName,status, specialty, introduction ,consultationAuthority } = this.props.detail;
  const {graphic, video,radio} = this.props;
  var reviewDoctor= !!this.props.referral&&!!this.props.referral.reviewDoctor?this.props.referral.reviewDoctor:undefined;
  var reviewAdmin= !!this.props.referral&&!!this.props.referral.reviewAdmin?this.props.referral.reviewAdmin:undefined;
  //var  image='https://ihoss.oss-cn-beijing.aliyuncs.com/PIC/1565054172356-docMng.jpg';
  if (!image) { message.warning('请上传医生头像', 2); return false; }
  /* if (!circleImage) { message.warning('请上传医生名片', 2); return false; } */
 var idcard=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

  var reg1 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  if (!name||!reg1.test(name)) { message.warning('请输入正确的医生姓名', 2); return false; }
  if (!doctorId) { message.warning('请输入医生编号', 2); return false; }
  if (!workingLife) { message.warning('请输入从业年限', 2); return false; }
  if (!deptId) { message.warning('请选择科室', 2); return false; }
  if (!mobile || !/^1\d{10}$/.test(mobile)) { message.warning('请输入正确的手机号', 2); return false; }
  if (!idNumber||!idcard.test(idNumber)) { message.warning('请输入正确的身份证号码', 2); return false; }
  if (!practiceNumber) { message.warning('请输入执业证号', 2); return false; }
  if (!practiceScope) { message.warning('请输入执业范围', 2); return false; }

   if (!level) { message.warning('请输入医生职称', 2); return false; } 
  //if (!hisDoctorName) { message.warning('请输入用户名', 2); return false; }

  //if (!sortNo) { message.warning('请输入医生排序号', 2); return false; }
  if (graphic.isOnDuty == 1 && !graphic.remune) { message.warning('请输入图文咨询价格', 2); return false; }
  if (video.isOnDuty == 1 && !video.remune) { message.warning('请输入电话咨询价格', 2); return false; }
  if (radio.isOnDuty == 1 && !radio.remune) { message.warning('请输入视频咨询价格', 2); return false; }
  /* if(consultationAuthority=='4'){ message.warning('请选择医生会诊权限', 2); return false; } */
  /* if (!specialty) { message.warning('请输入医生擅长领域', 2); return false; } */
  /* if (!introduction) { message.warning('请输入医生介绍', 2); return false; } */
  const Gmoney = graphic.remune;
  const Vmoney = video.remune;
  const Rmoney = radio.remune;
  graphic.remune = Gmoney * 100;
  video.remune = Vmoney * 100;
  radio.remune = Rmoney * 100;
  var payload='';
  if(!!reviewAdmin||!!reviewDoctor){
     
     payload = {
      hisId: sessionStorage.getItem('hisId'),
      hisName: '重庆医科大学附属儿童医院',
      image,
      name,
      doctorId,
      level:!!level ? level : '',
      mobile,
      deptId,
      deptName,
      deptName:!!deptName ? deptName : '',
      deptmentId:!!deptmentId ? deptmentId : '',
      deptmentName :!!deptmentName ? deptmentName : '',
      specialty :!!specialty ? specialty : '',
      hisDoctorName:!!hisDoctorName?hisDoctorName:'',
      introduction:!!introduction ? introduction : '',
      reviewDoctor:!!reviewDoctor?reviewDoctor:'',
      reviewAdmin:!!reviewAdmin?reviewAdmin:'',
      inquirys: JSON.stringify([graphic, video,radio]),
      workingLife,
      startValidDate:!!startValidDate?startValidDate:'',
      endValidDate:!!endValidDate?endValidDate:'',
        practiceScope:!!practiceScope?practiceScope:'',
        category:!!category?category:'',
        insuranceEndDate:!!insuranceEndDate?insuranceEndDate:'',
        insuranceStartDate:!!insuranceStartDate?insuranceStartDate:'',
        underwritingUnit:!!underwritingUnit?underwritingUnit:'',
        policyNumber:!!policyNumber?policyNumber:'',
        prescriptionQualification:!!prescriptionQualification?prescriptionQualification:'',
        practiceLevel:!!practiceLevel?practiceLevel:'',
        practiceMedicalInstitution:!!practiceMedicalInstitution?practiceMedicalInstitution:'',
        practiceNumber:!!practiceNumber?practiceNumber:'',
        auditTime:!!auditTime?auditTime:'',
        idNumber:!!idNumber?idNumber:'',
        policyNumber:!!policyNumber?policyNumber:'',
        consultationAuthority:!!consultationAuthority?consultationAuthority:'0',
        status:!!status?status:'2',
    };
  }else{
      payload = {
        hisId: sessionStorage.getItem('hisId'),
        hisName: '重庆医科大学附属儿童医院',
        image,
        name,
        doctorId,
        level:!!level ? level : '',
        mobile,
        deptId,
        deptName,
        deptName:!!deptName ? deptName : '',
        deptmentId:!!deptmentId ? deptmentId : '',
        deptmentName :!!deptmentName ? deptmentName : '',
        specialty :!!specialty ? specialty : '',
        hisDoctorName:!!hisDoctorName?hisDoctorName:'',
        introduction:!!introduction ? introduction : '',
        inquirys: JSON.stringify([graphic, video,radio]),
        workingLife,
        startValidDate:!!startValidDate?startValidDate:'',
        endValidDate:!!endValidDate?endValidDate:'',
        practiceScope:!!practiceScope?practiceScope:'',
        category:!!category?category:'',
        insuranceEndDate:!!insuranceEndDate?insuranceEndDate:'',
        insuranceStartDate:!!insuranceStartDate?insuranceStartDate:'',    
        underwritingUnit:!!underwritingUnit?underwritingUnit:'',
        policyNumber:!!policyNumber?policyNumber:'',
        prescriptionQualification:!!prescriptionQualification?prescriptionQualification:'',
        practiceLevel:!!practiceLevel?practiceLevel:'',
        practiceMedicalInstitution:!!practiceMedicalInstitution?practiceMedicalInstitution:'',
        practiceNumber:!!practiceNumber?practiceNumber:'',
        auditTime:!!auditTime?auditTime:'',
        idNumber:!!idNumber?idNumber:'',
        policyNumber:!!policyNumber?policyNumber:'',
        consultationAuthority:!!consultationAuthority?consultationAuthority:'0',
        status:!!status?status:'2',
      };
    
   
    
  }
  console.log(this.props.detail)
  this.setState({
    showDetail:false,
    showModal:false
  })
  if (!!this.props.detail.id) {
    payload.doctorInfoId = !!this.props.detail.doctorInfoId?this.props.detail.doctorInfoId:'';
    payload.id = this.props.detail.id;
    dispatch({
      type: 'docMng1/update',
      payload,
    });
  } else {
    dispatch({
      type: 'docMng1/add',
      payload,
    });
  }
}
handleFileChange = (e) => {
  const file = e.target.files[0]
    console.log("file",file)
  if (file) {
    
      
      this.setState({
        selectedImageFile: file,
        src: file,
   
        
      })
    
  }

  e.target.value = ''
}
onChange1=(e)=> {
  console.log("e",e);
  e.preventDefault();
  let files;
  if(e.dataTransfer) {
      files = e.dataTransfer.files;
  } else if(e.target) {
      files = e.target.files;
  } 
  
   console.log("filse",files.length)
  if(files.length > 0){
    this.setState({
      showMore:true,
    })
      // 验证 files[0] 信息的文件大小
      const fileMaxSize = 1024;
      let fileSize = files[0].size/1024;
      if(fileSize > fileMaxSize){
          alert("文件不能大于1M！");
          return false;
      } else if(fileSize <= 0) {
          alert("文件不能为0");
          return false;
      }
        console.log("filse",files[0])
      // 验证 files 信息的文件类型
      const fileType = files[0].type;
     
      const reader = new FileReader();

      reader.onload = () => {
          this.setState({
              src: reader.result
          })

      }
      var image = new Image();
      //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
      image.src = this.state.src;
      var Img=new Image();
       Img.src=this.state.src;
       console.log("image",image.width,image.height)
      if (image.width < 120&& image.height < 134) {
       
      }else{
          if (120/ 134  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
          {
              Img.width = 120;   //以框的宽度为标准
              Img.height = 120* (image.height / image.width);
          } 
          else {   //原图片宽高比例 小于 图片框宽高比例
              Img.width = 134  * (image.width / image.height);
              Img.height = 134  ;   //以框的高度为标准
          }

      }
      console.log("img",Img);
    
      this.setState({
        src:Img
      })
      reader.readAsDataURL(files[0]);

  } else {
      if(this.state.src === null) {
          alert("请选择文件");
      }
      return false;
  }
}

uploadImg() {
if(this.state.src === null) {
    alert("请选择图片");
    return false;
}

const croppedCanvas = this.cropper.getCroppedCanvas({
    minWidth: 1200,
    minHeight:1340,
    width: 1200,
    height: 1300,
    
    maxWidth:1200,
    maxHeight:1340
});
   console.log("canvs",croppedCanvas)
if(typeof croppedCanvas === "undefined") {
    return;
}
croppedCanvas.toBlob(async blob => {
    // 图片name添加到blob对象里
    blob.name = this.state.fileName;
    // 创建提交表单数据对象
    const filedata = new FormData();
    // 添加要上传的文件
    filedata.append('file', blob, blob.name);
    console.log(this.cropper.getCroppedCanvas().toDataURL())
    this.setState({
       img:this.cropper.getCroppedCanvas().toDataURL()
    })
    
}, "image/jpeg")
}
uploadImg1() {
if(this.state.src === null) {
    alert("请选择图片");
    return false;
}

const croppedCanvas = this.cropper.getCroppedCanvas({
    minWidth: 1200,
    minHeight:1340,
    width: 1200,
    height: 1300,
    
    maxWidth:1200,
    maxHeight:1340
});
   console.log("canvs",croppedCanvas)
if(typeof croppedCanvas === "undefined") {
    return;
}
croppedCanvas.toBlob(async blob => {
    // 图片name添加到blob对象里
    blob.name = this.state.fileName;
    // 创建提交表单数据对象
    const filedata = new FormData();
    // 添加要上传的文件
    filedata.append('file', blob, blob.name);
    console.log(this.cropper.getCroppedCanvas().toDataURL())
   
    $.ajax({
      url: window.location.origin+'/api/mch/health/api/file/upload?type=PIC&inquiryId=2222',
      method: 'POST',
      processData: false,
      contentType: false,
      cache: false,
      data: filedata,
      success: (e) => {
          console.log(e)
          this.setState({showMore: false,});
          if (e.code === 0) {
            message.success('上传成功', 2);
            this.changeDet({image: e.data});
    
            this.setState({showModal1: false, fileList: []});
          } else if (e.code === 999) {
            message.error(e.msg, 3, () => hashHistory.push({pathname: '/login'}));
          } else {
            message.error(e.msg);
          }
      },
      error:(e) =>{
        this.setState({showMore: false,});
        message.error(`文件上传失败`);
      }
  });
}, "image/png")
}
  query = (pageNum) => {
    const { dispatch } = this.props;
    this.setState({
      pageNum:pageNum,
    })
    console.log("s",pageNum,this.state.name)

    dispatch({
      type: 'docMng1/list',
      payload: {
        name: this.state.name,
        pageNum,
        deptName:this.state.deptName,
        status:this.state.status,
        type:'1',
        hisId: sessionStorage.getItem('hisId'),
      },
    });
  }
  action = (ids, operType) => {
    const { dispatch } = this.props;
    if (operType == 'del') {
      confirm({
        content: '删除操作不可撤销，是否确定删除？',
        onOk() {
          dispatch({ type: 'docMng1/action', payload: {ids, operType} });
        },
      });
    } else {
      dispatch({ type: 'docMng1/action', payload: {ids, operType} });
    }
  }
  actions = (operType) => {
    if (this.state.ids.length > 0) {
      this.action(this.state.ids.join(','), operType);
    } else {
      message.warning('请选择批量操作的医生！', 2);
    }
  }
  submit2 = () => {
    window.location.href='https://ihoss.oss-cn-beijing.aliyuncs.com/file/%E7%9B%91%E7%AE%A1%E7%AB%AF-%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF%E6%A8%A1%E7%89%88.xlsx';
  }
  submit1 = () => {
    console.log("ids",this.state.ids)
    if(this.state.ids.length>0){
      const form =  document.getElementById('export1');// eslint-disable-line
      form.submit();
    }else{
      message.warning('请选择要导出的医生！', 2);
    }
    
  }
  setAll=(e)=>{
      var checked=e.target.checked;
     const { dispatch } = this.props;
      dispatch({
        type: 'docMng1/changegraphic',
        payload: {isOnDuty: checked ? 1 : 0},
      });
      dispatch({
        type: 'docMng1/changevideo',
        payload: {isOnDuty: checked ? 1 : 0},
      });
      dispatch({
        type: 'docMng1/changeradio',
        payload: {isOnDuty: checked ? 1 : 0},
      });
      this.changeDet({consultationAuthority: !checked?'0':this.props.detail.consultationAuthority=='0'?'4':this.props.detail.consultationAuthority})
      


  }
  setAll1=(e)=>{
    var checked=e.target.checked;
   const { dispatch } = this.props;
    dispatch({
      type: 'docMng1/changegraphic',
      payload: {isOnDuty: checked ? 1 : 0},
    });
    dispatch({
      type: 'docMng1/changevideo',
      payload: {isOnDuty: checked ? 1 : 0},
    });
    dispatch({
      type: 'docMng1/changeradio',
      payload: {isOnDuty: checked ? 1 : 0},
    });

}
  /* submit1 = () => { 
    this.props.data.recordList
      if(this.props.data.recordList.length>0){
        const form =  document.getElementById('export1');// eslint-disable-line
        console.log(this.state.pageNum,this.state.name)
        form.submit();
      }else{
        message.warning('暂未查询到相关数据!', 2);
      }
    
  } */
  beforeUpload = (file) => {
    if (/^[\s\S]+\.xls|[\s\S]+\.xlsx|[\s\S]+\.csv$/.test(file.name)) {
      return true;
    } else {
      message.warning('请选择正确的Excel文件上传', 2);
      return false;
    }
  }
  fileChange = (info) => {
    if (/^[\s\S]+\.xls|[\s\S]+\.xlsx|[\s\S]+\.csv$/.test(info.file.name)) {
      this.setState({fileList: [info.file]});
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === 0) {
        message.success(info.file.response.msg, 2, () => {
          this.query(1);
          this.setState({showModal1: false, fileList: [],pageNum:1});
        });
      } else if (info.file.response.code === 999) {
        message.error(info.file.response.msg, 3, () => hashHistory.push({pathname: '/login'}));
      } else {
        message.error(info.file.response.msg);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  }
  getFunc = () => {
    const { dispatch } = this.props;
        dispatch({
            type: 'docMng1/getFunc',
            payload: {
              hisId:'2214'
            },
        });
  
    console.log('12121', this.props, this.props)
 }
 onClose=()=>{
   this.setState({
     showDetail:false
   })
 }
 showM=(docId,id)=>{
  this.setState({
    showModal:true,
  })
  const { dispatch } = this.props;
   this.getFunc();
  dispatch({ type: 'docMng1/detail', payload: {doctorId:docId,hisId:sessionStorage.getItem('hisId') } }); 
  }
  show=(docId,id)=>{
    this.setState({
      showDetail:true,
    })
    this.changeDet({auditTime: ''});
    const { dispatch } = this.props;
   this.getFunc();
    if(docId=='1'&&id=='1'){
      dispatch({ type: 'docMng1/depts', payload: {hisId: sessionStorage.getItem('hisId')} });
      dispatch({ type: 'docMng1/detail', payload: {doctorId:'1',hisId:sessionStorage.getItem('hisId') } });
  
    }else{  
    
    dispatch({ type: 'docMng1/depts', payload: {hisId: sessionStorage.getItem('hisId')} });
    dispatch({ type: 'docMng1/detail', payload: {doctorId:docId,hisId:sessionStorage.getItem('hisId') } });

    }
    }
  reset = (doctorId,id) => {
    const { dispatch } = this.props;
    confirm({
      content: '重置密码操作不可撤销，是否确定重置密码？',
      onOk() {
        dispatch({ type: 'docMng1/reset', payload: {account: doctorId,id:id,hisId:sessionStorage.getItem('hisId') } });
      },
    });
  }
  qrCode = (doctorId, deptId,ticket) => {
    const form =  document.getElementById('exportCode');// eslint-disable-line
    const scene =  document.getElementById('scene');// eslint-disable-line
    scene.value = `doctorId=${doctorId}&deptId=${deptId}&ticket=${ticket}`;
    form.submit();
  }
  render() {
    console.log("hisp",this.props.location.query.operate);
    var operateList='';
    var doctorAdd=false;
    var doctorStart=false;
    var doctorStop=false;
    var doctorEdit=false;
    var doctorDel=false;
    var doctorReset=false;
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='DOCTOR_ADD')
          {
           doctorAdd=true;
          }
          if(operateList[i]=='DOCTOR_START')
          {
           doctorStart=true;
          }
          if(operateList[i]=='DOCTOR_STOP')
          {
           doctorStop=true;
          }
          if(operateList[i]=='DOCTOR_EDIT')
          {
           doctorEdit=true;
            
          }
          if(operateList[i]=='DOCTOR_DEL')
          {
           doctorDel=true;
            
          }
          if(operateList[i]=='DOCTOR_RESET')
          {
           doctorReset=true;
            
          }
          

  }
    }
     
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '工号',
      dataIndex: 'no',
    },  {
      title: '用户名',
      dataIndex: 'hisDoctorName',
    },{
      title: '职称',
      dataIndex: 'title',
    }, {
      title: '科室',
      dataIndex: 'dept',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '创建时间',
      dataIndex: 'date',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (action) => {
        return (
          <span>
           {doctorEdit&&<a onClick={() =>
            this.showM(action.doctorId,action.id)
            }>服务权限</a>}
            {doctorEdit&&<span className="divider-v" />}
            {doctorEdit&&<a onClick={() =>
              this.show(action.doctorId,action.id)
              }>详情</a>}
            {doctorEdit&&<span className="divider-v" />}
            <a href={action.qrUrl}  target="_blank">二维码</a>
            {doctorReset&&<span className="divider-v" />}
            {doctorReset&&<a className="delete" onClick={() => this.reset(action.doctorId,action.id)}>重置密码</a>}
          </span>
        );
      },
    }];
    
    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item) => {
      return {
        key: item.id,
        name: item.name,
        no: item.doctorId,
        hisDoctorName:item.hisDoctorName,
        title: item.level,
        dept: item.deptName,
        status: item.status == 1 ? '正常' : '停用',
        date: formatDate(new Date(item.createTime)),
        sort: item.sortNo,
        action: {id: item.id, doctorId: item.doctorId, status: item.status, deptId: item.deptId,ticket:item.qrTicket,qrUrl:item.qrUrl},
      };
    }) : [];
    return (
      <div className="page-doc-mng">
        <div className="query-box">
        <div style={{marginBottom:'10px',fontWeight:'bold'}}>  查询条件</div>
          <span>医生姓名：</span>
          <Input
            type="text" size="large" placeholder="请输入医生姓名"
            value={this.state.name} onChange={e => this.setState({name: e.target.value})}
          />
          <span>科室名称：</span>
          <Input
            type="text" size="large" placeholder="请输入科室名称"
            value={this.state.deptName} onChange={e => this.setState({deptName: e.target.value})}
          />
          <span>医生状态：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.status}
            onChange={value => this.setState({status: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">正常</Option>
            <Option value="2">停用</Option>
          </Select>
          <Button size="large"   type="primary" onClick={() => this.query(1)}>确 定</Button>
          
            
            
        </div>
        <div style={{marginBottom:'35px',fontWeight:'bold'}}>  科室列表
         <div style={{display:'inline',float:'right'}}>
            <Button size="large" style={{marginRight: '10px'}}  onClick={this.submit1}><Icon type="download" />导出 <i className='xia'/>
            </Button>
            {doctorAdd&&<Button
              size="large" type="primary" style={{marginRight: '10px'}}  icon="plus"
              onClick={() =>  this.show('1','1')}
            >添加</Button>}
            { doctorAdd&&<Button size="large" style={{marginRight: '10px'}} onClick={() => this.setState({showModal1: true})}>批量导入</Button> }
          </div>
        </div>

        
        {console.log('我是data',data)}
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            showQuickJumper: true,
            current: currentPage,
            total: totalCount,
            showTotal: total => `共 ${total} 条`,
            onChange: pageNumber => this.query(pageNumber),
          }}
          rowSelection={{
            selectedRowKeys: this.state.ids,
            onChange: (selectedRowKeys) => {
              
              this.setState({ids: selectedRowKeys});
            },
          }}
        />
        <div style={{position:'relative',top: '-43px',width:'500px'}}>
            {doctorStop&&<Button style={{marginRight: '10px'}}  size="large" onClick={() => this.actions('invalid')}>批量停用</Button>}
              {doctorStart&&<Button style={{marginRight: '10px'}} size="large" onClick={() => this.actions('valid')}>批量启用</Button>}
              {doctorDel&&<Button style={{marginRight: '10px'}}  size="large" onClick={() => this.actions('del')}>批量删除</Button>}
              <span style={{color: '#108ee9'}}>已选中{this.state.ids.length}条数据</span>
        </div>
        <Drawer
      title="医生信息"
      placement="right"
      bodyStyle={{
        width: '1200px',
      
      }}
      width='1200'
      closable={true}
      onClose={this.onClose}
      visible={this.state.showDetail}
    >
        <div className="page-doc-det1">
        { /* this.state.showMore&&<div className='copper'>
          <div>
                <Cropper
                style={{ width: "120", height: "134" }}       
                zoomable={false}
                mouseWheelZoom={false}
                touchDragZoom={false}
                minContainerWidth={120}
                minContainerHeight={134}
                minCanvasWidth={120}
                minCanvasHeight={134}
                dragCrop={false}
                aspectRatio={1200/1340}
                guides={false} 
                resizable={false}
                src={this.state.src}
                getCropData={(e)=>{
                  console.log("end",e)
                }}
                ref={cropper => {this.cropper = cropper}}
              />
            </div>
          
            <div className="uploadCrop" >
              <img src={this.state.img} alt=""/>
            </div>
        </div> */ 
      }
        

          <div style={{marginBottom:'45px'}}><span>医生头像</span>
          
            {/* <Upload
              name="file"
              action="/api/mch/health/api/file/upload?type=PIC&inquiryId=2222"
              beforeUpload={this.beforeUpload}
              onChange={this.fileChange}
              onRemove={() => false}
              fileList={this.state.fileList}
            ></Upload> */}
          <input type="file" title="" accept="image/*" onChange={this.onChange1} style={{left:'54px',position:'absolute',opacity:'0',width:'120px',height:'134px',marginLeft:'25px'}}/>
          { <div className="file-box">
              {this.props.detail.image ?
                 <img src={this.props.detail.image}
                  style={{width:'120px',height:'134px'}} alt="" /> :
                  <Icon type="plus" style={{fontSize: '53px', color: '#4FAFCD'}} />}
                  <span style={{position:'absolute',
            left: '65px',
            bottom: '-30px'}}>建议尺寸为 120px * 134px</span>
            </div>   }
           <div className='leftInput'>
            <span style={{marginLeft:'61px'}}><span className='info'>*</span>医生姓名</span><Input
              size="large" placeholder="请输入医生姓名"
              value={this.props.detail.name}
              onChange={e => this.changeDet({name: e.target.value})}
            />   
            <span style={{marginLeft:'73px'}}>用户名</span><Input
            size="large" placeholder="请输入用户名"
            value={this.props.detail.hisDoctorName}
            onChange={e => this.changeDet({hisDoctorName: e.target.value})}
            />
          <span style={{marginLeft:'31px'}}><span className='info'>*</span>医生编号</span><Input
            size="large" placeholder="请输入医生编号："
            value={this.props.detail.doctorId} 
            disabled={this.props.location.query.doctorId}
            onChange={e => this.changeDet({doctorId: e.target.value})}
          />
          <br/> 
            <span style={{marginLeft:'61px'}}><span className='info'>*</span>从业年限</span><InputNumber
            size="large" placeholder="请输入从业年限"
            min={0}
            value={this.props.detail.workingLife}
            onChange={e => this.changeDet({workingLife: e})}
          />
            <span style={{marginLeft:'52px'}}><span className='info'>*</span>所属科室</span><Select
              size="large"
              style={{width: '140px'}}
              placeholder="请选择"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
              value={this.props.detail.deptId ? `${this.props.detail.deptName}` : undefined}
              onChange={e => this.changeDet({deptId: e.split('-')[0], deptName: e.split('-')[1]})}
            >
              {this.props.depts.map(dept => <Option value={`${dept.no}-${dept.name}`} key={dept.no}>{dept.name}</Option>)}
            </Select>
            <span style={{marginLeft:'70px'}}><span className='info'>*</span>手机号</span><Input
              size="large" placeholder="请输入手机号"
              value={this.props.detail.id ? this.props.detail.mobile.substring(0,3)+"****"+this.props.detail.mobile.substring(7) : this.props.detail.mobile}            onChange={e => this.changeDet({mobile: e.target.value, id: ''})}
            />
            </div>
            </div>
          <div >
              <span><span className='info'>*</span>身份证号码</span><Input
              size="large" placeholder="请输入身份证号码"
              value={this.props.detail.idNumber}
              onChange={e => this.changeDet({idNumber: e.target.value})}
            />
            <span style={{marginLeft:'36px'}}>首次获证时间</span>
            <div className = 'choosetime1'>
            {!!this.props.detail.auditTime&&<DatePicker 
              placeholder='请选择首次获证时间'
              locale={locale.datePicker}
            defaultValue={moment(this.props.detail.auditTime, dateFormat)}
            onChange={(date, dateString) => {
              this.changeDet({auditTime:dateString+ ' 00:00:00'});
             }} />}
              {!this.props.detail.auditTime&&<DatePicker 
                placeholder='请选择首次获证时间'
                locale={locale.datePicker}
                onChange={(date, dateString) => {
                  console.log("d",date)
                  this.changeDet({auditTime:dateString+ ' 00:00:00'});
                  }} />}
             </div>
           
            <span style={{marginLeft:'65px'}}><span className='info'>*</span>执业证号</span><Input
              size="large" placeholder="请输入执业证号"
              value={this.props.detail.practiceNumber}
              onChange={e => this.changeDet({practiceNumber: e.target.value})}
            />
            <span>执业医疗机构</span><Input
              size="large" placeholder="请输入执业医疗机构"
              value={this.props.detail.practiceMedicalInstitution}
              onChange={e => this.changeDet({practiceMedicalInstitution: e.target.value})}
            />
          </div>
          
          <div>
            <span style={{marginLeft:'20px'}}>执业级别</span><Input
            size="large" placeholder="请输入执业级别"
            value={this.props.detail.practiceLevel}
            onChange={e => this.changeDet({practiceLevel: e.target.value})}
          />
            <span style={{marginLeft:'60px'}}><span className='info'>*</span>医师职称</span>
            <Select
              size="large"
              style={{width: '140px'}}
              placeholder="请选择"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
              value={this.props.detail.level ? `${this.props.detail.level}` : undefined}
              onChange={e => this.changeDet({level: e})}
              >
              {!!this.props.selectOptions&&this.props.selectOptions.doctorTitleList&&this.props.selectOptions.doctorTitleList.map(dept =>
                 <Option value={dept} key={dept}>{dept}</Option>)}
            </Select>
          
            <span style={{marginLeft:'55px'}} >医师处方资格</span>
          <Select
          size="large"
          style={{width: '140px'}}
          placeholder="请选择医师处方资格"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
          value={this.props.detail.prescriptionQualification ? `${this.props.detail.prescriptionQualification}` : undefined}
          onChange={e => this.changeDet({prescriptionQualification: e})}
          >
          {!!this.props.selectOptions&&this.props.prescriptionQualificationMap&&this.props.prescriptionQualificationMap.map((dept,index )=>
             <Option value={dept.dex} >{dept.value}</Option>)}
        </Select>
          <span style={{marginLeft:'39px'}}>保险保单号</span><Input
          size="large" placeholder="请输入保险保单号"
          value={this.props.detail.policyNumber}
            onChange={e => this.changeDet({policyNumber: e.target.value})}
          />
          </div>
          <div>
            <span style={{marginLeft:'20px'}}>承保单位</span><Input
            size="large" placeholder="请输入承保单位"
            value={this.props.detail.underwritingUnit}
            onChange={e => this.changeDet({underwritingUnit: e.target.value})}
          />
            <span style={{marginLeft:'67px'}}>保险期限</span>
               {!!this.props.detail.insuranceStartDate&&<RangePicker 
                style={{width:'200px'}}
               defaultValue={[moment(this.props.detail.insuranceStartDate,dateFormat), moment(this.props.detail.insuranceEndDate,dateFormat)]}
               locale={locale.datePicker}
  
                onChange={(data,dataString)=>{
                 this.changeDet({insuranceStartDate:dataString[0]+ ' 00:00:00',insuranceEndDate:dataString[1]+ ' 00:00:00'})
                } }/>}
                 {!this.props.detail.insuranceStartDate&&<RangePicker 
                  locale={locale.datePicker}
                  style={{width:'200px'}}
                   onChange={(data,dataString)=>{
                    this.changeDet({insuranceStartDate:dataString[0]+ ' 00:00:00',insuranceEndDate:dataString[1]+ ' 00:00:00'})
                   } }/>}
         
            <span style={{marginLeft:'15px'}}>医师类别</span>
          <Select
          size="large"
          style={{width: '140px'}}
          placeholder="请选择医师类别"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
          value={this.props.detail.category ? `${this.props.detail.category}` : undefined}
          onChange={e => this.changeDet({category: e})}
          >
          {!!this.props.selectOptions&&this.props.selectOptions.categoryList&&this.props.selectOptions.categoryList.map(dept =>
             <Option value={dept} >{dept}</Option>)}
        </Select>
          <span style={{marginLeft:'47px'}}><span className='info'>*</span>执业范围</span><Input
          size="large" placeholder="请输入执业范围"
          value={this.props.detail.practiceScope}
            onChange={e => this.changeDet({practiceScope: e.target.value})}
          />
         
          </div>

          <div> 
            <span style={{marginLeft:'20px'}}>有效时间</span>
            {!!this.props.detail.startValidDate&&<RangePicker 
              style={{width:'200px'}}
             defaultValue={[moment(this.props.detail.startValidDate,dateFormat), moment(this.props.detail.endValidDate,dateFormat)]}
             locale={locale.datePicker}

              onChange={(data,dataString)=>{
               this.changeDet({startValidDate:dataString[0]+ ' 00:00:00',endValidDate:dataString[1]+ ' 00:00:00'})
              } }/>}
               {!this.props.detail.startValidDate&&<RangePicker 
                locale={locale.datePicker}
                style={{width:'200px'}}
                 onChange={(data,dataString)=>{
                  this.changeDet({startValidDate:dataString[0]+ ' 00:00:00',endValidDate:dataString[1]+ ' 00:00:00'})
                 } }/>}

              { <span style={{marginLeft:'28px'}}>职能部门</span> }{ <Select
              size="large"
              style={{ width: '140px' }}
              placeholder="请选择"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
              value={!!this.props.detail&&this.props.detail.deptmentId ? `${this.props.detail.deptmentName}` : undefined}
              onChange={e =>{if(!!this.props.detail.hospitalId||this.state.selectHospital!=''){
                  this.changeDet({ deptmentId: e.split('-')[0], deptmentName: e.split('-')[1] })}
              else{
                  message.warning('请先选择医院！', 2); 
              }
              }}
          >
              {!!this.props.funcdata&&this.props.funcdata.map(dept => <Option value={`${dept.id}-${dept.name}`} key={dept.id}>{dept.name}</Option>)}
        </Select>  }
        <span style={{marginLeft:'82px'}}><span className='info'>*</span>服务状态</span>
        {  <Switch
             checked={this.props.detail.status=='1'}
              onChange={this.changeStatus} 
            
            />  }
        </div>
        <div>
          <span style={{marginLeft:'20px'}}>服务权限</span>
            
            <Checkbox onChange={e => this.setAll(e)}   
            checked={
              this.props.graphic.isOnDuty == 1&&
              this.props.video.isOnDuty == 1
              &&this.props.radio.isOnDuty == 1
              /* &&
              !!this.props.detail.consultationAuthority&&this.props.detail.consultationAuthority!='0' */
            } 
            >全选</Checkbox>
            {this.props.graphic.isOnDuty == 1 || this.props.video.isOnDuty == 1 || this.state.isOnDuty ? <div>
              <Checkbox checked={this.props.graphic.isOnDuty == 1} onChange={e => this.changeDuty(e.target.checked, 1)}>
                图文咨询
                <Input
                  size="large" className="mini" placeholder="请输入价格(元)"
                  value={this.props.graphic.remune}
                  onChange={e => this.changeMoney(e.target.value, 1)}
                />
              </Checkbox>
              <Checkbox checked={this.props.video.isOnDuty == 1} onChange={e => this.changeDuty(e.target.checked, 2)}>
                电话咨询
                <Input
                  size="large" className="mini" placeholder="请输入价格(元)"
                  value={this.props.video.remune}
                  onChange={e => this.changeMoney(e.target.value, 2)}
                />
              </Checkbox>
              <Checkbox checked={!!this.props.radio&&this.props.radio.isOnDuty == 1} onChange={e => this.changeDuty(e.target.checked, 3)}>
                视频咨询
                <Input
                  size="large" className="mini" placeholder="请输入价格(元)"
                  value={!!this.props.radio&&this.props.radio.remune}
                  onChange={e => this.changeMoney(e.target.value, 3)}
                />
                </Checkbox>
                {<Checkbox  style={{ marginLeft:'10px' }} checked={!!this.props.detail.consultationAuthority&&(this.props.detail.consultationAuthority!='0'||this.props.detail.consultationAuthority=='4')}
                onChange={e => this.changeDet({consultationAuthority: !!this.props.detail.consultationAuthority&&this.props.detail.consultationAuthority!='0'?'0':'4'})}
                >
                医生会诊
                <Select
                size="large"
                style={{width: '120px',marginLeft:'10px', marginRight: '30px'}}
                placeholder="请选择医生会诊权限"
                value={this.props.detail.consultationAuthority=='0'?'无权限':this.props.detail.consultationAuthority=='1'?'会诊审核员':
                        this.props.detail.consultationAuthority=='2'?'会诊医师':this.props.detail.consultationAuthority=='3'?'会诊报告审核员':''}
                onChange={e => this.changeDet({consultationAuthority: e})}
              >
                <Select.Option value="1">会诊审核员</Select.Option>
                <Select.Option value="2">会诊医师</Select.Option>
                <Select.Option value="3">会诊报告审核员</Select.Option>
              </Select>
              </Checkbox> }
            </div> : ''}
          </div>
          <div>
              <span>转诊管理：</span>
              <div>
              <Switch    
                  checked={(!!this.props.referral&&!!this.props.referral&&(!!this.props.referral.reviewAdmin&&!!this.props.referral.reviewDoctor)&&(this.props.referral.reviewAdmin=='1'||this.props.referral.reviewDoctor!==''))||this.state.isOnDuty1}
                  onChange={this.changeSer}
              />
                  <div style={{display:'flex'}}>
                      <p className='jg' style={{paddingRight:'10px'}}>监管端</p>
                      <Checkbox disabled={!(!!this.props.referral&&!!this.props.referral&&(!!this.props.referral.reviewAdmin&&!!this.props.referral.reviewDoctor)&&(this.props.referral.reviewAdmin=='1'||this.props.referral.reviewDoctor!=='')||this.state.isOnDuty1)} checked={(!!this.props.referral&&!!this.props.referral&&!!this.props.referral.reviewAdmin&&(this.props.referral.reviewAdmin=='1'))?"checked":""} onChange={e => this.changeDuty1(1)}>
                          转诊管理
                      </Checkbox>
              </div>
              <div style={{display:'flex'}}>
                      <p className='jg' style={{paddingRight:'10px'}}>医生端</p>
                      <Checkbox disabled={!(!!this.props.referral&&!!this.props.referral&&(!!this.props.referral.reviewAdmin&&!!this.props.referral.reviewDoctor)&&(this.props.referral.reviewAdmin=='1'||this.props.referral.reviewDoctor!=='')||this.state.isOnDuty1)}  checked={(!!this.props.referral&&!!this.props.referral&&!!this.props.referral.reviewDoctor&&(this.props.referral.reviewDoctor=='1'||this.props.referral.reviewDoctor=='3'))?"checked":""} onChange={e => this.changeDuty1(2)}>
                       申请转诊
                      </Checkbox>
                      <Checkbox disabled={!(!!this.props.referral&&!!this.props.referral&&(!!this.props.referral.reviewAdmin&&!!this.props.referral.reviewDoctor)&&(this.props.referral.reviewAdmin=='1'||this.props.referral.reviewDoctor!=='')||this.state.isOnDuty1)} checked={(!!this.props.referral&&!!this.props.referral&&!!this.props.referral.reviewDoctor&&(this.props.referral.reviewDoctor=='2'||this.props.referral.reviewDoctor=='3'))?"checked":""} onChange={e => this.changeDuty1(3)}>
                          审核
                      </Checkbox>  
              </div>
          </div>
        </div>

          
          <div><span style={{marginLeft:'20px'}}>擅长领域</span><TextArea
            value={this.props.detail.specialty}
            onChange={e => this.changeDet({specialty: e.target.value})}
          /></div>
          <div><span style={{marginLeft:'20px'}}>医生介绍</span><TextArea
            value={this.props.detail.introduction}
            onChange={e => this.changeDet({introduction: e.target.value})}
          /></div>
          <div className="btns">
            <Button
              size="large"
              onClick={() =>{
                this.onClose()
              }}
            >取 消</Button>
            <Button size="large" type="primary" onClick={this.submit}>确 认</Button>
          </div>
        </div>
        </Drawer>
        <Modal
        title="服务权限设置"
        style={{ top: 60 }}
        visible={this.state.showModal}
        maskClosable={true}
        onCancel={this.cancelModal}
        onOk={this.submit}
      >
        <div className="add-dept-modal1">
           <div className="setting">
              <div className="chat">
                  <div className="left">
                  <Checkbox  onChange={e => this.setAll1(e)} checked={
                    this.props.graphic.isOnDuty == 1&&
                    this.props.video.isOnDuty == 1
                    &&this.props.radio.isOnDuty == 1
                  }>
                    在线诊疗
                  </Checkbox>
                  </div>
                  <div className="right">
                      <div className="item">
                       <Checkbox checked={this.props.graphic.isOnDuty == 1} 
                       onChange={e => this.changeDuty(e.target.checked, 1)}>
                      图文咨询
                      <Input
                        style={{width: '200px'}}
                        size="large" className="mini" placeholder="请输入价格(元)"
                        value={this.props.graphic.remune}
                        onChange={e => this.changeMoney(e.target.value, 1)}
                      />
                    </Checkbox>
                      </div>
                      <div className="item">
                          <Checkbox checked={this.props.video.isOnDuty == 1} 
                          onChange={e => this.changeDuty(e.target.checked, 2)}>
                          电话咨询
                          <Input
                          style={{width: '200px'}}
                            size="large" className="mini" placeholder="请输入价格(元)"
                            value={this.props.video.remune}
                            onChange={e => this.changeMoney(e.target.value, 2)}
                          />
                        </Checkbox>
                      </div>
                      <div className="item" style={{ borderBottom:'none' }}>
                        <Checkbox style={{ paddingBottom:'5px' }} checked={!!this.props.radio&&this.props.radio.isOnDuty == 1} onChange={e => this.changeDuty(e.target.checked, 3)}>
                        视频咨询
                        <Input
                        style={{width: '200px'}}
                          size="large" className="mini" placeholder="请输入价格(元)"
                          value={!!this.props.radio&&this.props.radio.remune}
                          onChange={e => this.changeMoney(e.target.value, 3)}
                        />
                        </Checkbox>
                      </div>
                  </div>
               </div>
               <div className="mdt" style={{ borderTop:'none'}} >
                 <div className="left">
                    <Checkbox checked={!!this.props.detail.consultationAuthority&&(this.props.detail.consultationAuthority!='0'||this.props.detail.consultationAuthority=='4')}
                    onChange={e => this.changeDet({consultationAuthority: !!this.props.detail.consultationAuthority&&this.props.detail.consultationAuthority!='0'?'0':'4'})}>
                    医生会诊
                    </Checkbox> 
                 </div>
                 <div className="right">
                      <div className="item" style={{ width:'320px',borderBottom:'none' }} > 
                      <Checkbox   checked={!!this.props.detail.consultationAuthority&&(this.props.detail.consultationAuthority!='0'||this.props.detail.consultationAuthority=='4')}
                      onChange={e => this.changeDet({consultationAuthority: !!this.props.detail.consultationAuthority&&this.props.detail.consultationAuthority!='0'?'0':'4'})}
                      >
                      医生会诊
                      <Select
                      size="large"
                      style={{width: '200px',marginLeft:'10px'}}
                      placeholder="请选择医生会诊权限"
                      value={this.props.detail.consultationAuthority=='0'?'无权限':this.props.detail.consultationAuthority=='1'?'会诊审核员':
                              this.props.detail.consultationAuthority=='2'?'会诊医师':this.props.detail.consultationAuthority=='3'?'会诊报告审核员':''}
                      onChange={e => this.changeDet({consultationAuthority: e})}
                    >
                        <Select.Option value="1">会诊审核员</Select.Option>
                        <Select.Option value="2">会诊医师</Select.Option>
                        <Select.Option value="3">会诊报告审核员</Select.Option>
                      </Select>
                      </Checkbox>
                      </div>
                  </div>
               </div>
           </div>
        </div>
      </Modal>
        <Modal
          title="批量导入医生"
          visible={this.state.showModal1}
          maskClosable={false}
          footer={null}
          onCancel={() => this.setState({showModal1: false, fileList: []})}
        >
          <div className="files-modal">
            {  <Button onClick={this.submit2}><Icon type="download" />下载导入模板</Button>  }
            <Upload
              name="file"
              action={'/api/mch/health/api/doctor/import'}
              beforeUpload={this.beforeUpload}
              onChange={this.fileChange}
              onRemove={() => false}
              fileList={this.state.fileList}
            >
              <Button><Icon type="upload" />上传导入文件</Button>
            </Upload>
          </div>
        </Modal>
        <Modal
          title="医生头像"
          visible={this.state.showMore}
          maskClosable={false}
          footer={null}
          onCancel={() => this.setState({showMore: false, fileList: []})}
        >
          <div className="upload-modal" style={{height:'200px'}} >
                   { this.state.showMore&&<div className='copper'
                   style={{position:'absolute',left:'200px',top:'100px'}}>
                        <div> 
                        <Cropper
                        style={{ width: "120", height: "134" }}       
                        zoomable={false}
                        mouseWheelZoom={false}
                        touchDragZoom={false}
                        minContainerWidth={120}
                        minContainerHeight={134}
                        minCanvasWidth={120}
                        minCanvasHeight={134}
                        dragCrop={false}
                        aspectRatio={1200/1340}
                        guides={false} 
                        resizable={false}
                        src={this.state.src}
                        getCropData={(e)=>{
                          console.log("end",e)
                        }}
                        ref={cropper => {this.cropper = cropper}}
                      />
                    </div>    
                    <div className="uploadCrop" style={{marginLeft:'165px',top:'0px',position:'absolute'}}>
                      <img src={this.state.img} alt="" 
                      style={{width:'120px',height:'134px'}}
                      width='120px' height='134px'/>
                    </div>
            </div>  
          }
      { this.state.showMore&&<div 
        
         className='confirm'
         style={{
          cursor: 'pointer',
          width: '100px',
          background: '#4cabcf',
          textAlign: 'center',
          height:'32px',
          lineHeight: '32px',
          color: 'white',
          position: 'absolute',
          display: 'block',
          left:'203px',
          top: '250px',
          marginLeft: '8px',
          borderRadius: '5px',
        }}
          onClick={() => this.uploadImg()} >确定</div>}
      { this.state.showMore&&this.state.img!=''&&<span 
         style={{
          cursor: 'pointer',
          width: '100px',
          background: '#4cabcf',
          textAlign: 'center',
          height:'32px',
          lineHeight: '32px',
          color: 'white',
          position: 'absolute',
          display: 'block',
          left:' 377px',
          top: '250px',
          borderRadius: '5px',
        }}
      
       className='confirm1' onClick={() => this.uploadImg1()} >上传</span>}


      
        
          {/* <Upload
            name="file"
            action="/api/mch/health/api/file/upload?type=PIC&inquiryId=2222"
            beforeUpload={this.beforeUpload}
            onChange={this.fileChange}
            onRemove={() => false}
            fileList={this.state.fileList}
          ></Upload> */}
        <input type="file" title="" accept="image/*" 
        onChange={this.onChange1} style={{left:'10px',position:'absolute',opacity:'0',width:'120px',height:'134px',}}/>
        { <div className="file-box">
            {this.props.detail.image ? 

              <img src={this.props.detail.image} alt="" style={{width:'120px',height:'134px'}} /> :
                <Icon type="plus" 
                style={{fontSize: '53px', color: '#4FAFCD'}} />}
                <span style={{position:'absolute',
          left: '14px',
          bottom: '45px'}}>建议尺寸为 120px * 134px</span>
          </div>   }
          </div>
        </Modal>
        
        <form
          id="export2" method="post" target="_blank"
          action=""
        />
        <form
          id="export1" method="post" target="_top"
          action={"/api/mch/health/api/doctor/export?ids="+this.state.ids}
        />   
        <form
          id="exportCode" method="post" target="_blank"
        >
          <input type="hidden" name="hisId" value={sessionStorage.getItem('hisId')} />
          <input type="hidden" name="page" value="pages/home/home" />
          <input type="hidden" name="scene" value="" id="scene" />
        </form>
      </div>
    );
  }
}
export default connect((state) => {
  const { docMng1 } = state;
  return {
    ...docMng1,
  };
})(DocMng1);
