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
            isOnDuty: false,
            hideMobile: '',
            show: false,
            admin:false,
            admin1:false,
            admin2:false,
            showMore: false,
            src: null,
            img: '',
            selectedImageFile: '',
            editImageModalVisible: '',
            selectHospital:'',
        }
        this.onChange1 = this.onChange1.bind(this);
    }
    componentDidMount(){
        this.getHospital();
        if(!!this.props.detail&&this.props.detail.hospitalId){
            this.getDept(this.props.detail.hospitalId);
            this.getFunc(this.props.detail.hospitalId);
        }
        
        
 
    }
    //查询医院
    getHospital = () => {
        const { dispatch } = this.props;
            dispatch({
                type: 'docDet/getHospital',
                payload: {
                },
            });
      
        console.log('12121', this.props, this.props)
    }
    getDept = (id) => {
        const { dispatch } = this.props;
            dispatch({
                type: 'docDet/getDept',
                payload: {
                    hospitalId:id
                },
            });
      
        console.log('12121', this.props, this.props)
    }
    getFunc = (id) => {
        const { dispatch } = this.props;
            dispatch({
                type: 'docDet/getFunc',
                payload: {
                    hospitalId:id
                },
            });
      
        console.log('12121', this.props, this.props)
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'docDet/clear',
        });
    }
    showMobile = (phone) => {
        if (phone == '') {
            this.setState({
                show: true
            })
        }
    }
    changeDet = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'docDet/changeDet',
            payload,
        });
        /* if(!!payload.hospitalName){
            this.getDept(payload.hospitalId);
            this.getFunc(payload.hospitalId);
        } */
    }
    changeDet1 = () => {
        document.getElementById('mobile').value = '';
    }
    changeSer = () => {
        this.setState({ isOnDuty: !this.state.isOnDuty });
        if(this.state.isOnDuty){
            const {dispatch}=this.props;
            dispatch({
                type: 'docDet/changeRef',
                payload:{reviewAdmin:'0',reviewDoctor:''},
            });

        }
      
    }
    changeDuty = (type) => {
        if(!!this.props.detail&&!!this.props.detail){
            if(type==1){
                const { dispatch } = this.props;
                 var value=!!this.props.detail.reviewAdmin?this.props.detail.reviewAdmin:'';
                 if(value=='1'){
                     value='0';
                 }else{
                    value='1';
                 }
                var payload={reviewAdmin:value};
                dispatch({
                    type: 'docDet/changeRef',
                    payload,
                });
            }
            if(type==2){
                const { dispatch } = this.props;
                var value=!!this.props.detail.reviewDoctor?this.props.detail.reviewDoctor:'';
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
                    type: 'docDet/changeRef',
                    payload,
                });
            }
            if(type==3){
                const { dispatch } = this.props;
                var value=!!this.props.detail.reviewDoctor?this.props.detail.reviewDoctor:'';
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
                    type: 'docDet/changeRef',
                    payload,
                });
            }
        }else{
            if(type==1){
                const { dispatch } = this.props;
                var payload={reviewAdmin:'1'};
                dispatch({
                    type: 'docDet/changeRef',
                    payload,         
                });
            }
            if(type==2){
                const { dispatch } = this.props;
                var payload={reviewDoctor: '1' };
                dispatch({
                    type: 'docDet/changeRef',
                    payload,
                });
            }
            if(type==3){
                const { dispatch } = this.props;
                var  payload={reviewDoctor: '2' };
                dispatch({
                    type: 'docDet/changeRef',
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
                    type: 'docDet/changegraphic',
                    payload: { remune: v },
                });
            }
            if (type == 2) { 
                dispatch({
                    type: 'docDet/changevideo', 
                    payload: { remune: v },
                });
            }
        }
    }
    beforeUpload = (file) => {
        console.log("f", file);
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
            this.setState({ fileList1: [info.file] });
        }
        if (info.file.status === 'done') {
            if (info.file.response.code === 0) {
                message.success(info.file.response.msg, 2);
                this.changeDet({ circleImage: info.file.response.data });
                this.setState({ showModal1: false, fileList1: [] });
            } else if (info.file.response.code === 999) {
                message.error(info.file.response.msg, 3, () => hashHistory.push({ pathname: '/login' }));
            } else {
                message.error(info.file.response.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
    fileChange = (info) => {
        if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(info.file.name)) {
            this.setState({ fileList: [info.file] });
        }
        if (info.file.status === 'done') {
            if (info.file.response.code === 0) {
                message.success(info.file.response.msg, 2);
                var image = new Image();
                image.src = info.file.response.data;
                var Img = new Image();
                Img.src = info.file.response.data;
                if (image.width < 1200 && image.height < 1340) {
                    Img.width = 1200;   //以框的宽度为标准
                    Img.height = 1340;
                } else {
                    if (1200 / 1340 <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
                    {
                        Img.width = 1200;   //以框的宽度为标准
                        Img.height = 1340
                    }
                    else {   //原图片宽高比例 小于 图片框宽高比例
                        Img.width = 1200;
                        Img.height = 1340;   //以框的高度为标准
                    }

                }
                this.changeDet({ image: Img.src });
                this.setState({ showModal1: false, fileList: [] });
            } else if (info.file.response.code === 999) {
                message.error(info.file.response.msg, 3, () => hashHistory.push({ pathname: '/login' }));
            } else {
                message.error(info.file.response.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
    submit = () => {
        const { dispatch } = this.props;
        var { image, name, doctorId, level, mobile,hospitalId,hospitalName,deptmentId,deptmentName, deptId, deptName, specialty, introduction, workingLife } = this.props.detail;
        var reviewDoctor= !!this.props.detail&&!!this.props.detail.reviewDoctor?this.props.detail.reviewDoctor:undefined;
        var reviewAdmin= !!this.props.detail&&!!this.props.detail.reviewAdmin?this.props.detail.reviewAdmin:undefined;
        const { graphic, video } = this.props;
       
        if (!image) { message.warning('请上传医生头像', 2); return false; }
        /* if (!circleImage) { message.warning('请上传医生名片', 2); return false; } */
        var reg1 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (!name||!reg1.test(name)) { message.warning('请输入正确的医生姓名', 2); return false; }
        if (!doctorId) { message.warning('请输入医生工号', 2); return false; }
        if (!level) { message.warning('请输入医生职称', 2); return false; }
        if (!workingLife) { message.warning('请输入从业年限', 2); return false; }
        if (!mobile || !/^1\d{10}$/.test(mobile)) { message.warning('请输入正确的手机号', 2); return false; }
        if (!hospitalName) { message.warning('请选择转诊医院', 2); return false; }
        if (!deptId) { message.warning('请选择科室', 2); return false; }
        if (graphic.isOnDuty == 1 && !graphic.remune) { message.warning('请输入图文咨询价格', 2); return false; }
        if (video.isOnDuty == 1 && !video.remune) { message.warning('请输入视频咨询价格', 2); return false; }
        if (!specialty) { message.warning('请输入医生擅长领域', 2); return false; }
        if (!introduction) { message.warning('请输入医生介绍', 2); return false; }
        const Gmoney = graphic.remune;
        const Vmoney = video.remune;  
        graphic.remune = Gmoney * 100;
        video.remune = Vmoney * 100;               
        var payload='';
        if(!!reviewAdmin||!!reviewDoctor){
            payload = {
                hisId: sessionStorage.getItem('hisId'),
                hisName: '重庆医科大学附属儿童医院',
                image,
                name,
                doctorId,
                level,
                mobile,
                deptId:!!deptId ? deptId : '',
                deptName:!!deptName ? deptName : '',
                deptmentName :!!deptmentName ? deptmentName : '',
                hospitalName,
                hospitalId,
                deptmentId :!!deptmentId ? deptmentId : '',
                specialty, 
                introduction,
                reviewDoctor:!!reviewDoctor ? reviewDoctor : '',
                reviewAdmin:!!reviewAdmin ? reviewAdmin : '',
                workingLife,
            };
        }else{
            payload = {
                hisId: sessionStorage.getItem('hisId'),
                hisName: '重庆医科大学附属儿童医院',
                image,
                name,
                doctorId,
                level,
                mobile,
                deptId:!!deptId ? deptId : '',
                deptName:!!deptName ? deptName : '',
                deptmentName :!!deptmentName ? deptmentName : '',
                hospitalName,
                hospitalId,
                deptmentId :!!deptmentId ? deptmentId : '',
                specialty, 
                introduction,
                workingLife,
            };
        }
        if (this.props.location.query.id) {
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
        console.log("file", file)
        if (file) {
            this.setState({
                selectedImageFile: file,
                src: file,
            })
        }
        e.target.value = ''
    }
    onChange1(e) {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        console.log("filse", files.length)
        if (files.length > 0) {
            this.setState({
                showMore: true,
            })
            // 验证 files[0] 信息的文件大小
            const fileMaxSize = 1024;
            let fileSize = files[0].size / 1024;
            if (fileSize > fileMaxSize) {
                alert("文件不能大于1M！");
                return false;
            } else if (fileSize <= 0) {
                alert("文件不能为0");
                return false;
            }
            console.log("filse", files[0])
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
            var Img = new Image();
            Img.src = this.state.src;
            console.log("image", image.width, image.height)
            if (image.width < 120 && image.height < 134) {

            } else {
                if (120 / 134 <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
                {
                    Img.width = 120;   //以框的宽度为标准
                    Img.height = 120 * (image.height / image.width);
                }
                else {   //原图片宽高比例 小于 图片框宽高比例
                    Img.width = 134 * (image.width / image.height);
                    Img.height = 134;   //以框的高度为标准
                }

            }
            this.setState({
                src: Img
            })
            reader.readAsDataURL(files[0]);
        } else {
            if (this.state.src === null) {
                alert("请选择文件");
            }
            return false;
        }
    }
    uploadImg() {
        if (this.state.src === null) {
            alert("请选择图片");
            return false;
        }
        const croppedCanvas = this.cropper.getCroppedCanvas({
            minWidth: 1200,
            minHeight: 1340,
            width: 1200,
            height: 1300,
            maxWidth: 1200,
            maxHeight: 1340
        });
        if (typeof croppedCanvas === "undefined") {
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
                img: this.cropper.getCroppedCanvas().toDataURL()
            })

        }, "image/jpeg")
    }
    uploadImg1() {
        if (this.state.src === null) {
            alert("请选择图片");
            return false;
        }

        const croppedCanvas = this.cropper.getCroppedCanvas({
            minWidth: 1200,
            minHeight: 1340,
            width: 1200,
            height: 1300,

            maxWidth: 1200,
            maxHeight: 1340
        });
        if (typeof croppedCanvas === "undefined") {
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
                url: window.location.origin + '/api/mch/health/api/file/upload?type=PIC&inquiryId=2222',
                method: 'POST',
                processData: false,
                contentType: false,
                cache: false,
                data: filedata,
                success: (e) => {
                    this.setState({ showMore: false, });
                    if (e.code === 0) {
                        message.success('上传成功', 2);
                        this.changeDet({ image: e.data });
                        this.setState({ showModal1: false, fileList: [] });
                    } else if (e.code === 999) {
                        message.error(e.msg, 3, () => hashHistory.push({ pathname: '/login' }));
                    } else {
                        message.error(e.msg);
                    }
                },
                error: (e) => {
                    this.setState({ showMore: false, });
                    message.error(`文件上传失败`);
                }
            });
        }, "image/png")
    }
    render() {
        return (
            <div className="page-doc-det">
                {this.state.showMore && <div className='copper'>
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
                            dragmove={() => {
                            }}
                            zoom={() => {
                            }}
                            aspectRatio={1200 / 1340}
                            guides={false}
                            resizable={false}
                            src={this.state.src}
                            getCropData={(e) => {
                            }}
                            ref={cropper => { this.cropper = cropper }}

                        />
                    </div>

                    <div className="uploadCrop" >
                        <img src={this.state.img} alt="" />
                    </div>

                </div>
                }
                {this.state.showMore && <div className='confirm' onClick={() => this.uploadImg()} >确定</div>}
                {this.state.showMore && this.state.img != '' && <span className='confirm1' onClick={() => this.uploadImg1()} >上传</span>}


                <div><span>医生头像：</span>
                    {/* <Upload 
                    name="file"
                    action="/api/mch/health/api/file/upload?type=PIC&inquiryId=2222"
                    beforeUpload={this.beforeUpload}
                    onChange={this.fileChange}
                    onRemove={() => false}
                    fileList={this.state.fileList}
                    ></Upload> */}
                    <input type="file" title="" accept="image/*" onChange={this.onChange1} style={{ left: '294px', position: 'absolute', opacity: '0', width: '120px', height: '134px', marginLeft: '50px' }} />

                    <div className="file-box">

                        {!!this.props.detail&&!!this.props.detail.image ? <img src={!!this.props.detail&&!!this.props.detail.image?this.props.detail.image:''} alt="" /> :
                            <Icon type="plus" style={{ fontSize: '53px', color: '#4FAFCD' }} />}
                    </div>

                </div>
                <span style={{
                    position: 'relative',
                    left: '65px',
                    top: '-15px'
                }}>建议尺寸为 120px * 134px</span>

                <div><span>姓名：</span><Input
                    size="large" placeholder="请输入姓名"
                    value={!!this.props.detail&&this.props.detail.name}
                    onChange={e => this.changeDet({ name: e.target.value })}
                /><span>工号：</span><Input
                        size="large" placeholder="请输入工号"
                        value={!!this.props.detail&&this.props.detail.doctorId}
                        disabled={this.props.location.query.doctorId}
                        onChange={e => this.changeDet({ doctorId: e.target.value })}
                    /></div>
                <div><span>职称：</span><Input
                    size="large" placeholder="请输入职称"
                    value={!!this.props.detail&&this.props.detail.level}
                    onChange={e => this.changeDet({ level: e.target.value })}
                /><span>从业年限：</span><InputNumber
                        size="large" placeholder="请输入从业年限"
                        value={!!this.props.detail&&this.props.detail.workingLife}
                        onChange={e => this.changeDet({ workingLife: e })}
                    /></div>
               {!!this.props.detail&& <div><span>手机号：</span><Input
                    size="large" placeholder="请输入手机号"
                    value={!!this.props.detail&&this.props.detail.id ? this.props.detail.mobile.substring(0, 3) + "****" + this.props.detail.mobile.substring(7) : this.props.detail.mobile} onChange={e => this.changeDet({ mobile: e.target.value, id: '' })}
                />
                <span>医院：</span><Select
                size="large"
                style={{ width: '220px' }}
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                value={this.props.detail.hospitalId ? `${this.props.detail.hospitalName}` : undefined}
                onChange={e =>{
                    console.log(e)
                     this.changeDet({ hospitalId: e.split('-')[0], hospitalName: e.split('-')[1] });
                     this.setState({selectHospital:e.split('-')[0]});
                     this.getDept(e.split('-')[0]);
                     this.getFunc(e.split('-')[0]);
                     this.changeDet({ deptId: '', deptName:'' })
                     this.changeDet({ deptmentId:'', deptmentName:'' })
                    }}
            >
                {!!this.props.hisdata&&this.props.hisdata.map(dept => <Option value={`${dept.id}-${dept.name}`} key={dept.id}>{dept.name}</Option>)}
            </Select>
               
                    
                </div>}
                <div> <span>科室：</span><Select
                size="large"
                style={{ width: '220px' }}
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                value={!!this.props.detail&&this.props.detail.deptId ? `${this.props.detail.deptName}` : undefined}
                onChange={e =>{if(!!this.props.detail.hospitalId||this.state.selectHospital!=''){
                     this.changeDet({ deptId: e.split('-')[0], deptName: e.split('-')[1] })
                    }
                     else{
                        message.warning('请先选择医院！', 2);  
                }}}
            >
                {!!this.props.deptdata&&this.props.deptdata.map(dept => <Option value={`${dept.id}-${dept.name}`} key={dept.id}>{dept.name}</Option>)}
            </Select>
                    <span style={{marginLeft:'24px'}}>职能部门：</span><Select
                    size="large"
                    style={{ width: '220px' }}
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
                </Select>
                </div>
                
                <div>
                    <span>转诊管理：</span>
                    <div>
                    <Switch    
                       checked={(!!this.props.detail&&(!!this.props.detail.reviewAdmin||!!this.props.detail.reviewDoctor)&&(this.props.detail.reviewAdmin=='1'||this.props.detail.reviewDoctor!==''))||this.state.isOnDuty}
                        onChange={this.changeSer}
                    />
                        <div style={{display:'flex'}}>
                            <p className='jg'>监管端</p>
                            <Checkbox disabled={!(!!this.props.detail&&!!this.props.detail&&(!!this.props.detail.reviewAdmin||!!this.props.detail.reviewDoctor)&&(this.props.detail.reviewAdmin=='1'||this.props.detail.reviewDoctor!=='')||this.state.isOnDuty)} checked={!!this.props.detail&&!!this.props.detail&&!!this.props.detail.reviewAdmin&&(this.props.detail.reviewAdmin=='1')} onChange={e => this.changeDuty(1)}>
                               转诊管理
                            </Checkbox>
                    </div>
                    <div style={{display:'flex'}}>
                            <p className='jg'>医生端</p>
                            <Checkbox disabled={!(!!this.props.detail&&!!this.props.detail&&(!!this.props.detail.reviewAdmin||!!this.props.detail.reviewDoctor)&&(this.props.detail.reviewAdmin=='1'||this.props.detail.reviewDoctor!=='')||this.state.isOnDuty)}  checked={!!this.props.detail&&!!this.props.detail&&!!this.props.detail.reviewDoctor&&(this.props.detail.reviewDoctor=='1'||this.props.detail.reviewDoctor=='3')} onChange={e => this.changeDuty(2)}>
                               转诊管理
                            </Checkbox>
                            <Checkbox disabled={!(!!this.props.detail&&!!this.props.detail&&(!!this.props.detail.reviewAdmin||!!this.props.detail.reviewDoctor)&&(this.props.detail.reviewAdmin=='1'||this.props.detail.reviewDoctor!=='')||this.state.isOnDuty)} checked={!!this.props.detail&&!!this.props.detail&&!!this.props.detail.reviewDoctor&&(this.props.detail.reviewDoctor=='2'||this.props.detail.reviewDoctor=='3')} onChange={e => this.changeDuty(3)}>
                               审核
                            </Checkbox>  
                    </div>
                </div></div>
                <div><span>擅长领域：</span><TextArea
                    value={!!this.props.detail&&this.props.detail.specialty}
                    onChange={e => this.changeDet({ specialty: e.target.value })}
                /></div>
                <div><span>医生介绍：</span><TextArea
                    value={!!this.props.detail&&this.props.detail.introduction}
                    onChange={e => this.changeDet({ introduction: e.target.value })}
                /></div>
                <div className="btns">
                    <Button
                        size="large"
                        onClick={() => {
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
