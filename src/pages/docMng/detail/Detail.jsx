import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import FileUpload from 'xl_alioss_react';
import { Input, Select, InputNumber, Switch, Checkbox, Upload, Icon, message, Button } from 'antd';
import "cropperjs/dist/cropper.css";
import Cropper from 'react-cropper';
import './style.less';

const Option = Select.Option;
const { TextArea } = Input;

class DocDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnDuty: true,
      hideMobile:'',
      show:false,
      showMore:false,
      src: null,
      img:'',
      selectedImageFile:'',
      editImageModalVisible:'',
    }
    this.onChange1 = this.onChange1.bind(this);
}

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'docDet/clear',
    });
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
      type: 'docDet/changeDet',
      payload,
    });
  }
  changeDet1 = () => {
    document.getElementById('mobile').value='';
  }
  changeSer = (checked) => {
    this.setState({isOnDuty: checked});
    this.changeDuty(false, 1);
    this.changeDuty(false, 2);
  }
  changeDuty = (checked, type) => {
    const { dispatch } = this.props;
    if (type == 1) {
      dispatch({
        type: 'docDet/changegraphic',
        payload: {isOnDuty: checked ? 1 : 0},
      });
    }
    if (type == 2) {
      dispatch({
        type: 'docDet/changevideo',
        payload: {isOnDuty: checked ? 1 : 0},
      });
    }
  }
  changeMoney = (v, type) => {
    if (/^\d+(\.\d{0,2})?$/.test(v) || v === '') {
      const { dispatch } = this.props;
      if (type == 1) {
        dispatch({
          type: 'docDet/changegraphic',
          payload: {remune: v},
        });
      }
      if (type == 2) {
        dispatch({
          type: 'docDet/changevideo',
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
  submit = () => {
    const { dispatch } = this.props;
    const {image,circleImage, name, doctorId, level, mobile,hisDoctorName,  deptId, deptName, specialty, introduction, workingLife } = this.props.detail;
    const {graphic, video} = this.props;
    if (!image) { message.warning('请上传医生头像', 2); return false; }
    if (!circleImage) { message.warning('请上传医生名片', 2); return false; }

    if (!name) { message.warning('请输入医生姓名', 2); return false; }
    if (!doctorId) { message.warning('请输入医生工号', 2); return false; }
    if (!level) { message.warning('请输入医生职称', 2); return false; }
    if (!workingLife) { message.warning('请输入从业年限', 2); return false; }
    if (!mobile || !/^1\d{10}$/.test(mobile)) { message.warning('请输入正确的手机号', 2); return false; }
    //if (!hisDoctorName) { message.warning('请输入用户名', 2); return false; }

    //if (!sortNo) { message.warning('请输入医生排序号', 2); return false; }
    if (!deptId) { message.warning('请选择科室', 2); return false; }
    if (graphic.isOnDuty == 1 && !graphic.remune) { message.warning('请输入图文咨询价格', 2); return false; }
    if (video.isOnDuty == 1 && !video.remune) { message.warning('请输入视频咨询价格', 2); return false; }
    if (!specialty) { message.warning('请输入医生擅长领域', 2); return false; }
    if (!introduction) { message.warning('请输入医生介绍', 2); return false; }
    const Gmoney = graphic.remune;
    const Vmoney = video.remune;
    graphic.remune = Gmoney * 100;
    video.remune = Vmoney * 100;
    const payload = {
      hisId: sessionStorage.getItem('hisId'),
      hisName: '重庆医科大学附属儿童医院',
      image,
      circleImage,
      name,
      doctorId,
      level,
      mobile,
      deptId,
      deptName,
      specialty,
      hisDoctorName:!!hisDoctorName?hisDoctorName:'',
      introduction,
      inquirys: JSON.stringify([graphic, video]),
      workingLife,
    };
    if (this.props.location.query.doctorId) {
      payload.id = this.props.location.query.id;
      dispatch({
        type: 'docDet/update',
        payload,
      });
    } else {
      dispatch({
        type: 'docDet/add',
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
  onChange1(e) {
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
  render() {
    console.log(this.state.showMore);
    return (
      <div className="page-doc-det">
      {this.state.showMore&&<div className='copper'>
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
              dragmove={()=>{
                console.log("move")
              }}
              zoom={()=>{
                console.log("end")
              }}
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
 
      </div>
    }
      { this.state.showMore&&<div  className='confirm' onClick={() => this.uploadImg()} >确定</div>}
     { this.state.showMore&&this.state.img!=''&&<span  className='confirm1' onClick={() => this.uploadImg1()} >上传</span>}


        <div><span>医生头像：</span>
        {
          /*<Upload
            name="file"
            action="/api/mch/health/api/file/upload?type=PIC&inquiryId=2222"
            beforeUpload={this.beforeUpload}
            onChange={this.fileChange}
            onRemove={() => false}
            fileList={this.state.fileList}
            ></Upload>*/ }
        <input type="file" title="" accept="image/*" onChange={this.onChange1} style={{left:'294px',position:'absolute',opacity:'0',width:'120px',height:'134px',marginLeft:'50px'}}/>
  
          <div className="file-box">
        
            {this.props.detail.image ? <img src={this.props.detail.image} alt="" /> :
                <Icon type="plus" style={{fontSize: '53px', color: '#4FAFCD'}} />}
          </div>
        
        </div>
        <span style={{position:'relative',
          left: '65px',
          top: '-15px'}}>建议尺寸为 120px * 134px</span>
        <div><span>医生名片：</span><Upload
            name="file"
            action="/api/mch/health/api/file/upload?type=PIC&inquiryId=2222"
            beforeUpload={this.beforeUpload1}
            onChange={this.fileChange1}
            onRemove={() => false}
            fileList={this.state.fileList1}
            >
          <div className="file-box"  style={{width:"220px",borderRadius:"0px"}}>
            {this.props.detail.circleImage ? <img src={this.props.detail.circleImage} alt="" /> :
                <Icon type="plus" style={{fontSize: '53px', color: '#4FAFCD'}} />}
          </div>
        </Upload></div>
        <div><span>姓名：</span><Input
          size="large" placeholder="请输入姓名"
          value={this.props.detail.name}
          onChange={e => this.changeDet({name: e.target.value})}
        /><span>工号：</span><Input
          size="large" placeholder="请输入工号"
          value={this.props.detail.doctorId}
          disabled={this.props.location.query.doctorId}
          onChange={e => this.changeDet({doctorId: e.target.value})}
        /></div>
        <div><span>职称：</span><Input
          size="large" placeholder="请输入职称"
          value={this.props.detail.level}
          onChange={e => this.changeDet({level: e.target.value})}
        /><span>从业年限：</span><InputNumber
          size="large" placeholder="请输入从业年限"
          value={this.props.detail.workingLife}
          onChange={e => this.changeDet({workingLife: e})}
        /></div>
        <div><span>手机号：</span><Input
          size="large" placeholder="请输入手机号"
          value={this.props.detail.id ? this.props.detail.mobile.substring(0,3)+"****"+this.props.detail.mobile.substring(7) : this.props.detail.mobile}            onChange={e => this.changeDet({mobile: e.target.value, id: ''})}
        />
          <span>用户名：</span><Input
              size="large" placeholder="请输入用户名"
              value={this.props.detail.hisDoctorName}
              onChange={e => this.changeDet({hisDoctorName: e.target.value})}
              />
          </div>
        <div><span>科室：</span><Select
          size="large"
          style={{width: '220px'}}
          placeholder="请选择"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
          value={this.props.detail.deptId ? `${this.props.detail.deptId}-${this.props.detail.deptName}` : undefined}
          onChange={e => this.changeDet({deptId: e.split('-')[0], deptName: e.split('-')[1]})}
        >
          {this.props.depts.map(dept => <Option value={`${dept.no}-${dept.name}`} key={dept.no}>{dept.name}</Option>)}
        </Select></div>
        <div><span>服务：</span><div>
          <Switch
            checked={this.props.graphic.isOnDuty == 1 || this.props.video.isOnDuty == 1 || this.state.isOnDuty}
            onChange={this.changeSer}
          />
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
              视频咨询
              <Input
                size="large" className="mini" placeholder="请输入价格(元)"
                value={this.props.video.remune}
                onChange={e => this.changeMoney(e.target.value, 2)}
              />
            </Checkbox>
          </div> : ''}
        </div></div>
        <div><span>擅长领域：</span><TextArea
          value={this.props.detail.specialty}
          onChange={e => this.changeDet({specialty: e.target.value})}
        /></div>
        <div><span>医生介绍：</span><TextArea
          value={this.props.detail.introduction}
          onChange={e => this.changeDet({introduction: e.target.value})}
        /></div>
        <div className="btns">
          <Button
            size="large"
            onClick={() =>{
              history.back(-1)
            }}
          >取 消</Button>
          <Button size="large" type="primary" onClick={this.submit}>确 认</Button>
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  const { docDet } = state;
  return {
    ...docDet,
  };
})(DocDet);
