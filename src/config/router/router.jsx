import React from 'react';
import { Router } from 'dva/router';

const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
};

function RouterConfig({ history, app }) {
  
  const routes1 = [
    {
      path: '/',
      name: '/',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('../../components/root/model').default);
          cb(null, require('../../components/root/Root').default);
        });
      },
      indexRoute: {
        onEnter: (nextState, replace) => replace('/login'),
      },
      childRoutes: [

        //首页
        {
          path:'/home',
          name:'/home',
          getComponent(nextState,cb){
            registerModel(app,require('../../pages/home/model').default);
            cb(null,require('../../pages/home/Home').default);
          },
          indexRoute: {
            // onEnter: (nextState, replace) => replace('/login'),
          },
        },
        // 订单管理
        {
          path: '/order',
          name: '/order',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/order/list'),
          },
          childRoutes: [
            {
              path: '/order/list',
              name: '/order/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/list/model').default);
                cb(null, require('../../pages/order/list/OrdList').default);
              },
            },
            {
              path: '/order/comingOvertimeList',
              name: '/order/comingOvertimeList',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/list/model').default);
                cb(null, require('../../pages/order/list/OrdList').default);
              },
            },
            {
              path: '/order/listrefund',
              name: '/order/listrefund',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/listrefund/model').default);
                cb(null, require('../../pages/order/listrefund/OrdListRefund').default);
              },
            },
            {
              path: '/order/detail',
              name: '/order/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/detail/model').default);
                cb(null, require('../../pages/order/detail/OrdDet').default);
              },
            },
            // {
            //   path: '/member/detail',
            //   name: '/member/detail',
            //   getComponent(nextState, cb) {
            //     registerModel(app, require('../../pages/member/detail/model').default);
            //     cb(null, require('../../pages/member/detail/MemberDet').default);
            //   },
            // },
          ],
        },
         // 会诊管理
         {
          path: '/mdt',
          name: '/mdt',
          indexRoute:{
              onEnter:(nextState,replace)=>replace('/mdt/team')
          },
          childRoutes:[
            {          
              path: '/mdt/team',
              name: '/mdt/team',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/mdt/team/model').default);
                cb(null, require('../../pages/mdt/team/Team').default);
              },
            },
            {
              path: '/mdt/order',
              name: '/mdt/order',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/mdt/order/model').default);
                cb(null, require('../../pages/mdt/order/Order').default);
              },
            }
          ]

        },
        // 科室管理
        {
          path: '/dept',
          name: '/dept',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/dept/model').default);
            cb(null, require('../../pages/dept/Dept').default);
          },
        },
        //医院资质信息
        {
          path: '/hospitalInformation',
          name: '/hospitalInformation',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/hospitalInformation/model').default);
            cb(null, require('../../pages/hospitalInformation/hospitalInformation').default);
          },
        },
        // 医生管理
        {
          path: '/docMng',
          name: '/docMng',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/docMng/model').default);
            cb(null, require('../../pages/docMng/DocMng').default);
          },
        },
        // 医生编辑
        {
          path: '/docMng/detail',
          name: '/docMng/detail',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/docMng/detail/model').default);
            cb(null, require('../../pages/docMng/detail/Detail').default);
          },
        },
        //转诊审核
        {
          path:'/twoWayReferral',
          name:'/twoWayReferral',
          indexRoute:{
            onEnter:(nextState,replace)=>replace('/twoWayReferral/index')
          },
          childRoutes:[
            {
              path:'/twoWayReferral/referralAudit',
              name:'/twoWayReferral/referralAudit',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/twoWayReferral/referralAudit/model').default);
                cb(null, require('../../pages/twoWayReferral/referralAudit/referralAudit').default);
              },
            },
            {
              path:'/twoWayReferral/index',
              name:'/twoWayReferral/index',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/twoWayReferral/index/model').default);
                cb(null, require('../../pages/twoWayReferral/index/index').default);
              },
            }
          ]
        },
        //双转联盟管理
        {
          path:'/hospitalManagement',
          name:'/hospitalManagement',
          indexRoute:{
            onEnter:(nextState,replace)=>replace('/hospitalManagement/hospital')
          },
          childRoutes:[            
              {
                path:'/hospitalManagement/hospital',
                name:'/hospitalManagement/hospital',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/hospitalManagement/hospital/model').default);
                  cb(null, require('../../pages/hospitalManagement/hospital/hospital').default);
                },
              },
              {
                path:'/hospitalManagement/department',
                name:'/hospitalManagement/department',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/hospitalManagement/department/model').default);
                  cb(null, require('../../pages/hospitalManagement/department/department').default);
                },
              },
              {
                path:'/hospitalManagement/functionalDeparment',
                name:'/hospitalManagement/functionalDeparment',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/hospitalManagement/functionalDeparment/model').default);
                  cb(null, require('../../pages/hospitalManagement/functionalDeparment/functionalDeparment').default);
                },
              },
              {
                path:'/hospitalManagement/doctor',
                name:'/hospitalManagement/doctor',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/hospitalManagement/doctor/model').default);
                  cb(null, require('../../pages/hospitalManagement/doctor/doctor').default);
                },
              },
              {
                path:'/doctor/addDoctor',
                name:'/doctor/addDoctor',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/hospitalManagement/doctor/addDoctor/model').default);
                  cb(null, require('../../pages/hospitalManagement/doctor/addDoctor/addDoctor').default);
                },
              },
          ]
        },
        //职能部门管理
        {
          path: '/functionalManag',
          name: '/functionalManag',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/functionalManag/model').default);
            cb(null, require('../../pages/functionalManag/functionalManag').default);
          },
        },
        // 用户管理
        {
          path: '/user',
          name: '/user',
          indexRoute:{
              onEnter:(nextState,replace)=>replace('/user/list')
          },
          childRoutes:[
            {          
              path: '/user/list',
              name: '/user/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/user/list/model').default);
                cb(null, require('../../pages/user/list/UserList').default);
              },
            },
            {
              path: '/user/listpatients',
              name: '/user/listpatients',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/user/listpatients/model').default);
                cb(null, require('../../pages/user/listpatients/ListPatients').default);
              },
            }
          ]

        },

        // 运营管理
        {
          path: '/operate',
          name: '/operate',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/operate/statistics'),
          },
          childRoutes: [
            {
              path: '/operate/statistics',
              name: '/operate/statistics',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/statistics/model').default);
                cb(null, require('../../pages/operate/statistics/Statistics').default);
              },
            },
            {
              path: '/operate/complaint/list',
              name: '/operate/complaint/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/complaint/list/model').default);
                cb(null, require('../../pages/operate/complaint/list/List').default);
              },
            },
            {
              path: '/operate/complaint/detail',
              name: '/operate/complaint/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/complaint/detail/model').default);
                cb(null, require('../../pages/operate/complaint/detail/Detail').default);
              },
            },
          
            {
              path: '/operate/consult/list',
              name: '/operate/consult/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/consult/list/model').default);
                cb(null, require('../../pages/operate/consult/list/List').default);
              },
            },
            {
              path: '/operate/consult/detail',
              name: '/operate/consult/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/consult/detail/model').default);
                cb(null, require('../../pages/operate/consult/detail/Detail').default);
              },
            },
            {
              path: '/operate/evaluate',
              name: '/operate/evaluate',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/evaluate/model').default);
                cb(null, require('../../pages/operate/evaluate/Evaluate').default);
              },
            },
            {
              path: '/operate/evaluate/detail',
              name: '/operate/evaluate/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/evaluate/model').default);
                cb(null, require('../../pages/operate/evaluate/Detail').default);
              },
            },
              // 常用语管理
            {
              path: '/sample',
              name: '/sample',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/sample/model').default);
                cb(null, require('../../pages/sample/Sample').default);
              },
            },
             // 护士管理
             {
              path: '/nurse',
              name: '/nurse',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/nurse/model').default);
                cb(null, require('../../pages/nurse/Nurse').default);
              },
            },
            // 护士编辑
            {
              path: '/nurse/detail',
              name: '/nurse/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/nurse/detail/model').default);
                cb(null, require('../../pages/nurse/detail/Detail').default);
              },
            },
            // 随访模板管理
            {
              path: '/flowUpManage',
              name: '/flowUpManage',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/flowUpManage/model').default);
                cb(null, require('../../pages/flowUpManage/FlowUpManage').default);
              },
            },
            // 随访数据分析
            {
              path: '/flowUpData',
              name: '/flowUpData',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/flowUpData/model').default);
                cb(null, require('../../pages/flowUpData/FlowUpData').default);
              },
            },
            // 随访用户管理
        {
          path: '/flowUpUser',
          name: '/flowUpUser',
          indexRoute:{
              onEnter:(nextState,replace)=>replace('/flowUpUser/userlist')
          },
          childRoutes:[
            //首页
            {
              path: '/flowUpUser/index',
              name: '/flowUpUser/index',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/flowUpUser/index/model').default);
                cb(null, require('../../pages/flowUpUser/index/index').default);
              },
            },
             //患者详情
             {
              path: '/flowUpUser/patientdetail',
              name: '/flowUpUser/patientdetail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/flowUpUser/patientdetail/model').default);
                cb(null, require('../../pages/flowUpUser/patientdetail/PatientDetail').default);
              },
            },
            //模板管理
            {
              path: '/flowUpUser/template',
              name: '/flowUpUser/template',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/flowUpUser/template/model').default);
                cb(null, require('../../pages/flowUpUser/template/TemplateManage').default);
              },
            },
            //模板录入
            {
              path: '/flowUpUser/tempinput',
              name: '/flowUpUser/tempinput',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/flowUpUser/templateinput/model').default);
                cb(null, require('../../pages/flowUpUser/templateinput/templateinput').default);
              },
            },
            {
              path: '/flowUpUser/patientlist',
              name: '/flowUpUser/patientlist',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/flowUpUser/patientlist/model').default);
                cb(null, require('../../pages/flowUpUser/patientlist/PatientList').default);
              },
            }
          ]

        },
             // 操作日志
           {
              path: '/operate/operateLog',
              name: '/operate/operateLog',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/operateLog/model').default);
                cb(null, require('../../pages/operate/operateLog/OperateLog').default);
              },
            },
           {
                path: '/operate/operateLog/detail',
                name: '/operate/operateLog/detail',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/operate/operateLog/model').default);
                  cb(null, require('../../pages/operate/operateLog/Detail').default);
                },
              },
            
          ],
        },
       
         // 医疗业务管理
         {
          path: '/business',
          name: '/business',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/business/add'),
          },
          childRoutes: [
            {
              path: '/business/check/list',
              name: '/business/check/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/check/list/model').default);
                cb(null, require('../../pages/business/check/list/List').default);
              },
            },
          
            {
              path: '/business/add/list',
              name: '/business/add/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/add/list/model').default);
                cb(null, require('../../pages/business/add/list/OrdList').default);
              },
            },
            {
              path: '/business/check/detail',
              name: '/business/check/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/check/detail/model').default);
                cb(null, require('../../pages/business/check/detail/Detail').default);
              },
            },
            {
              path: '/business/add/detail',
              name: '/business/add/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/add/detail/model').default);
                cb(null, require('../../pages/business/add/detail/Detail').default);
              },

            },

            {
              path: '/business/prescription/list',
              name: '/business/prescription/',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/prescription/model').default);
                cb(null, require('../../pages/business/prescription/prescription').default);
              },
            },
            // {
            //   path: '/business/check/detail',
            //   name: '/business/check/detail',
            //   getComponent(nextState, cb) {
            //     registerModel(app, require('../../pages/business/check/detail/model').default);
            //     cb(null, require('../../pages/business/check/detail/Detail').default);
            //   },
            // },
          
          ],
        },
      

        //数据分析
        {
          path: '/dataanalysis',
          name: '/dataanalysis',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/dataanalysis/allanalysis'),
          },
          childRoutes:[
              {
                path: '/dataanalysis/allanalysis',
                name: '/dataanalysis/allanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/allanalysis/model').default);
                  cb(null, require('../../pages/analysis/allanalysis/AllAnalysis').default);
                },
              },
              {
                path: '/dataanalysis/deptanalysis',
                name: '/dataanalysis/deptanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/deptanalysis/model').default);
                  cb(null, require('../../pages/analysis/deptanalysis/DeptAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/deptanalysis/detail',
                name: '/dataanalysis/deptanalysis/detail',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/deptanalysis/detail/model').default);
                  cb(null, require('../../pages/analysis/deptanalysis/detail/DeptAnalysisDetail').default);
                },

              },

              {
                path: '/dataanalysis/docanalysis',
                name: '/dataanalysis/docanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/docanalysis/model').default);
                  cb(null, require('../../pages/analysis/docanalysis/DocAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/docanalysis/detail',
                name: '/dataanalysis/docanalysis/detail',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/docanalysis/detail/model').default);
                  cb(null, require('../../pages/analysis/docanalysis/detail/DocAnalysisDetail').default);
                },

              },

              {
                path: '/dataanalysis/visitanalysis',
                name: '/dataanalysis/visitanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/visitanalysis/model').default);
                  cb(null, require('../../pages/analysis/visitanalysis/VisitAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/useranalysis',
                name: '/dataanalysis/useranalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/useranalysis/model').default);
                  cb(null, require('../../pages/analysis/useranalysis/UserAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/eventanalysis',
                name: '/dataanalysis/eventanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/eventanalysis/model').default);
                  cb(null, require('../../pages/analysis/eventanalysis/EventAnalysis').default);
                },

              },
            


          ]
        },
        // 账户管理
        {
          path: '/account',
          name: '/account',
          indexRoute:{
              onEnter:(nextState,replace)=>replace('/account/list')
          },
          childRoutes:[
            {          
              path: '/account/list',
              name: '/account/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/account/list/model').default);
                cb(null, require('../../pages/account/list/AccountList').default);
              },
            },
           
          ]

        },
         //药师审方
         {
          path: '/drug',
          name: '/drug',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/drug/model').default);
            cb(null, require('../../pages/drug/Drug').default);
          },
        },
        // 页面统计
        {
          path: '/page',
          name: '/page',
          indexRoute:{
              onEnter:(nextState,replace)=>replace('/page/index')
          },
          childRoutes:[
            {          
              path: '/page/index',
              name: '/page/index',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/page/index/model').default);
                cb(null, require('../../pages/page/index/Index').default);
              },
            },
            {          
              path: '/page/message',
              name: '/page/message',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/page/message/model').default);
                cb(null, require('../../pages/page/message/Message').default);
              },
            },
           
          ]

        },

      ],
    },
    {
      path: '/login',
      name: '/login',
      getComponent(nextState, cb) {
        registerModel(app, require('../../pages/login/model').default);
        cb(null, require('../../pages/login/Login').default);
      },
    },
  ];
  const routes = [
    {
      path: '/',
      name: '/',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('../../components/root/model').default);
          cb(null, require('../../components/root/Root').default);
        });
      },
      indexRoute: {
        onEnter: (nextState, replace) => replace('/login'),
      },
      childRoutes: [

        //首页
        {
          path:'/home',
          name:'/home',
          getComponent(nextState,cb){
            registerModel(app,require('../../pages/home/model').default);
            cb(null,require('../../pages/home/Home').default);
          },
          indexRoute: {
            // onEnter: (nextState, replace) => replace('/login'),
          },
        },
        // 订单管理
        {
          path: '/order',
          name: '/order',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/order/list'),
          },
          childRoutes: [
            {
              path: '/order/list',
              name: '/order/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/list/model').default);
                cb(null, require('../../pages/order/list/OrdList').default);
              },
            },
            {
              path: '/order/comingOvertimeList',
              name: '/order/comingOvertimeList',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/list/model').default);
                cb(null, require('../../pages/order/list/OrdList').default);
              },
            },
            {
              path: '/order/listrefund',
              name: '/order/listrefund',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/listrefund/model').default);
                cb(null, require('../../pages/order/listrefund/OrdListRefund').default);
              },
            },
            {
              path: '/order/detail',
              name: '/order/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/order/detail/model').default);
                cb(null, require('../../pages/order/detail/OrdDet').default);
              },
            },
            // {
            //   path: '/member/detail',
            //   name: '/member/detail',
            //   getComponent(nextState, cb) {
            //     registerModel(app, require('../../pages/member/detail/model').default);
            //     cb(null, require('../../pages/member/detail/MemberDet').default);
            //   },
            // },
          ],
        },
        // 科室管理
        {
          path: '/dept',
          name: '/dept',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/dept/model').default);
            cb(null, require('../../pages/dept/Dept').default);
          },
        },
        //医院资质信息
        {
          path: '/hospitalInformation',
          name: '/hospitalInformation',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/hospitalInformation/model').default);
            cb(null, require('../../pages/hospitalInformation/hospitalInformation').default);
          },
        },
        // 医生管理
        {
          path: '/docMng',
          name: '/docMng',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/docMng/model').default);
            cb(null, require('../../pages/docMng/DocMng').default);
          },
        },
        // 医生编辑
        {
          path: '/docMng/detail',
          name: '/docMng/detail',
          getComponent(nextState, cb) {
            registerModel(app, require('../../pages/docMng/detail/model').default);
            cb(null, require('../../pages/docMng/detail/Detail').default);
          },
        },
        // 用户管理
        {
          path: '/user',
          name: '/user',
          indexRoute:{
              onEnter:(nextState,replace)=>replace('/user/list')
          },
          childRoutes:[
            {          
              path: '/user/list',
              name: '/user/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/user/list/model').default);
                cb(null, require('../../pages/user/list/UserList').default);
              },
            },
            {
              path: '/user/listpatients',
              name: '/user/listpatients',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/user/listpatients/model').default);
                cb(null, require('../../pages/user/listpatients/ListPatients').default);
              },
            }
          ]

        },

        // 运营管理
        {
          path: '/operate',
          name: '/operate',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/operate/statistics'),
          },
          childRoutes: [
            {
              path: '/operate/statistics',
              name: '/operate/statistics',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/statistics/model').default);
                cb(null, require('../../pages/operate/statistics/Statistics').default);
              },
            },
            {
              path: '/operate/complaint/list',
              name: '/operate/complaint/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/complaint/list/model').default);
                cb(null, require('../../pages/operate/complaint/list/List').default);
              },
            },
            {
              path: '/operate/complaint/detail',
              name: '/operate/complaint/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/complaint/detail/model').default);
                cb(null, require('../../pages/operate/complaint/detail/Detail').default);
              },
            },
          
            {
              path: '/operate/consult/list',
              name: '/operate/consult/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/consult/list/model').default);
                cb(null, require('../../pages/operate/consult/list/List').default);
              },
            },
            {
              path: '/operate/consult/detail',
              name: '/operate/consult/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/consult/detail/model').default);
                cb(null, require('../../pages/operate/consult/detail/Detail').default);
              },
            },
            {
              path: '/operate/evaluate',
              name: '/operate/evaluate',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/evaluate/model').default);
                cb(null, require('../../pages/operate/evaluate/Evaluate').default);
              },
            },
            {
              path: '/operate/evaluate/detail',
              name: '/operate/evaluate/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/operate/evaluate/model').default);
                cb(null, require('../../pages/operate/evaluate/Detail').default);
              },
            },
              // 常用语管理
            {
              path: '/sample',
              name: '/sample',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/sample/model').default);
                cb(null, require('../../pages/sample/Sample').default);
              },
            },
          
            
          ],
        },
       
         // 医疗业务管理
         {
          path: '/business',
          name: '/business',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/business/add'),
          },
          childRoutes: [
            {
              path: '/business/check/list',
              name: '/business/check/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/check/list/model').default);
                cb(null, require('../../pages/business/check/list/List').default);
              },
            },
          
            {
              path: '/business/add/list',
              name: '/business/add/list',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/add/list/model').default);
                cb(null, require('../../pages/business/add/list/OrdList').default);
              },
            },
            {
              path: '/business/check/detail',
              name: '/business/check/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/check/detail/model').default);
                cb(null, require('../../pages/business/check/detail/Detail').default);
              },
            },
            {
              path: '/business/add/detail',
              name: '/business/add/detail',
              getComponent(nextState, cb) {
                registerModel(app, require('../../pages/business/add/detail/model').default);
                cb(null, require('../../pages/business/add/detail/Detail').default);
              },

            },
          
          ],
        },
      

        //数据分析
        {
          path: '/dataanalysis',
          name: '/dataanalysis',
          indexRoute: {
            onEnter: (nextState, replace) => replace('/dataanalysis/allanalysis'),
          },
          childRoutes:[
              {
                path: '/dataanalysis/allanalysis',
                name: '/dataanalysis/allanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/allanalysis/model').default);
                  cb(null, require('../../pages/analysis/allanalysis/AllAnalysis').default);
                },
              },
              {
                path: '/dataanalysis/deptanalysis',
                name: '/dataanalysis/deptanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/deptanalysis/model').default);
                  cb(null, require('../../pages/analysis/deptanalysis/DeptAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/deptanalysis/detail',
                name: '/dataanalysis/deptanalysis/detail',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/deptanalysis/detail/model').default);
                  cb(null, require('../../pages/analysis/deptanalysis/detail/DeptAnalysisDetail').default);
                },

              },

              {
                path: '/dataanalysis/docanalysis',
                name: '/dataanalysis/docanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/docanalysis/model').default);
                  cb(null, require('../../pages/analysis/docanalysis/DocAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/docanalysis/detail',
                name: '/dataanalysis/docanalysis/detail',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/docanalysis/detail/model').default);
                  cb(null, require('../../pages/analysis/docanalysis/detail/DocAnalysisDetail').default);
                },

              },

              {
                path: '/dataanalysis/visitanalysis',
                name: '/dataanalysis/visitanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/visitanalysis/model').default);
                  cb(null, require('../../pages/analysis/visitanalysis/VisitAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/useranalysis',
                name: '/dataanalysis/useranalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/useranalysis/model').default);
                  cb(null, require('../../pages/analysis/useranalysis/UserAnalysis').default);
                },

              },
              {
                path: '/dataanalysis/eventanalysis',
                name: '/dataanalysis/eventanalysis',
                getComponent(nextState, cb) {
                  registerModel(app, require('../../pages/analysis/eventanalysis/model').default);
                  cb(null, require('../../pages/analysis/eventanalysis/EventAnalysis').default);
                },

              }


          ]
        }

      ],
    },
    {
      path: '/login',
      name: '/login',
      getComponent(nextState, cb) {
        registerModel(app, require('../../pages/login/model').default);
        cb(null, require('../../pages/login/Login').default);
      },
    },
  ];
  return <Router history={history} routes={routes1} />;
}

export default RouterConfig;
