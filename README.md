cqyikedaxuefushuertongyiyuanguanlihoutai,基于[react](https://github.com/reactjs)，[react-router@2.x](https://github.com/ReactTraining/react-router/tree/v2.8.1)，[dva](https://github.com/dvajs), [ant-design-mobile](https://mobile.ant.design/docs/react/introduce-cn)。

---

## 安装与使用

```bash
git clone http://192.168.11.202/fe-hicare/ehis-mch.git

cd ehis-mch

git pull

npm i

npm run start

npm run build
```

## 工程结构说明

```
--ehis-mch // 工程名
  --mock // 模拟数据模块，可写json数据和js函数
  --public // 公共文件、第三方库等
  --src // 工程源代码目录
    --components // 工程内部公共组件存放目录，每个组件分文件夹存放
    --config // 工程内部公共配置文件存放目录，每类配置文件分文件夹存放
      --constant // 公共常量配置
        constant.js
      --router // 路由配置
        router.jsx
      --theme // 皮肤配置（次文件必须含有）
        theme.less
    --pages // 工程页面存放目录，按业务功能分模块分文件夹
        --account/list         账号管理
        --analysis             数据分析
            --allanalysis      咨询、收益、用户分析
            --deptanalysis     科室分析
            --docanalysis      医生分析
            --eventanalysis    事件分析
            --useranalysis     用户、就诊人分析
            --visitanalysis    访问分析
        --business             业务订单
          --add                加号 
          --check              检查单
        --dept                 科室管理
        --docMng               医生管理
          --detail             医生详情
        --flowUpData           随访数据分析
        --flowUpManage         随访问卷管理
        --flowUpUser           随访用户管理
        --home                 首页
           --Norm              收益相关数据展示
           --Overview          用户、就诊人数据展示
           --Warning           智能预警数据
        --hospitalInformation  医院管理
        --login                登录
        --nurse                护士管理
          --detail             护士详情
        --operate              操作相关
          --complaint          投诉管理
          --consult            咨询管理
          --evaluate           评价管理
          --operateLog         操作日志 
          --statistics         数据统计
             --Chart           接诊统计
             --Dept            科室统计
             --List            基本溉况
        --order                咨询订单
           --detail            订单详情
           --list              订单列表
           --listrefund        退款订单列表
        --page
          --index              点击、浏览量统计
          --message            模板消息量统计
        --sample               常用语
          --detail             常用语详情
        --user
           --list              用户列表
           --listpatients      就诊人列表
    --resources // 工程内部资源存放目录
      --styles // 工程内部公共、全局样式存放目录
        common.scss
        mixin.scss
    --utils // 工程内部工具存放目录
      utils.js
    index.html // 工程部署访问入口页面
    index.jsx // 工程编译部署入口页面
  .gitignore
  README.md // 工程说明文档
```

## License

[MIT](https://tldrlegal.com/license/mit-license)

