import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '#',
    name: 'ums',
    meta: {title: '用户', icon: 'user'},
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/ums/member/index'),
        meta: {title: '用户管理', icon: "form"},
      },
      {
        path: 'coachManagement',
        name: 'coachManagement',
        component: () => import('@/views/ums/coach/index'),
        meta: {title: '教练管理', icon: "eye"},
      },
      {
        path: 'supplierManagement',
        name: 'supplierManagement',
        component: () => import('@/views/ums/supplier/index'),
        meta: {title: '供应商管理', icon: "example"},
        hidden:true
      },
      {
        path: 'divingCertificate',
        name: 'divingCertificate',
        component: () => import('@/views/ums/divingCertificate/index'),
        meta: {title: '潜水证书申请', icon: "divingCertificate"},
      },
    ]
  },

  {
    path: '',
    component: Layout,
    redirect: '#',
    name: 'permission',
    meta: {title: '权限管理', icon: 'authority_management'},
    children: [{
      path: 'adminPerson',
      name: 'adminPerson',
      component: () => import('@/views/permission/adminPerson/index'),
      meta: {title: '管理员', icon: 'adminPerson'}
    },{
      path: 'role',
      name: 'role',
      component: () => import('@/views/permission/role/index'),
      meta: {title: '角色管理', icon: 'permission_group'}
    },{
      path: 'permissionAll',
      name: 'permissionAll',
      component: () => import('@/views/permission/permissionAll/index'),
      meta: {title: '权限管理', icon: 'permission_group'}
    },{
      path: 'operationLog',
      name: 'operationLog',
      component: () => import('@/views/permission/operationLog/index'),
      meta: {title: '操作日志', icon: 'operation_log'}
    },
      {
        path: 'addUser',
        name: 'addUser',
        component: () => import('@/views/permission/adminPerson/addUser'),
        meta: {title: '添加管理员'},
        hidden:true
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@/views/permission/adminPerson/permission'),
        meta: {title: '权限操作'},
        hidden:true
      },{
        path: 'addPermission',
        name: 'addPermission',
        component: () => import('@/views/permission/permissionAll/addPermission'),
        meta: {title: '添加权限', icon: 'permission_group'},
        hidden:true
      }]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [
      {
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'productRecycle',
        name: 'productRecycle',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品回收站', icon: 'product-recycle'},
        hidden: true
      },
      {
        path: 'productComment',
        name: 'productComment',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品评价', icon: 'product-comment'},
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {title: '商品类型', icon: 'product-attr'}
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      },
      {
        path: 'productReview',
        name: 'productReview',
        component: () => import('@/views/pms/courseProduct/index'),
        meta: {title: '商品审核', icon: 'product-comment'},
      },
      {
        path: 'certificateList',
        name: 'certificateList',
        component: () => import('@/views/pms/certificate/index'),
        meta: {title: '证书列表', icon: 'product-brand'},
      },
      {
        path: 'addCertificate',
        name: 'addCertificate',
        component: () => import('@/views/pms/certificate/add'),
        meta: {title: '添加证书'},
        hidden: true
      },
      {
        path: 'updateCertificate',
        name: 'updateCertificate',
        component: () => import('@/views/pms/certificate/update'),
        meta: {title: '修改证书'},
        hidden: true
      },
      {
        path: 'courseProductDetail',
        name: 'courseProductDetail',
        component: () => import('@/views/pms/courseProduct/productDetail'),
        meta: {title: '潜水学证商品详情', icon: "total-today"},
        hidden:true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '#',
    name: 'oms',
    meta: {title: '订单管理', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'},
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'},
        hidden:true
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'},
        hidden:true
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path:'/sms',
    component: Layout,
    redirect: '#',
    name: 'sms',
    meta: {title: '营销管理', icon: 'sms'},
    children: [
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '图片管理', icon: 'sms-ad'},
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden: true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '修改广告'},
        hidden: true
      },
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'sms-flash'},
        hidden: true
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden: true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden: true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden: true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'},
        hidden: true
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden: true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden: true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'},
        hidden: true
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'},
        hidden: true
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'},
        hidden: true
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'},
        hidden: true
      }
    ]
  },
  {
    path:'/oms',
    component: Layout,
    redirect: '#',
    name: 'finance',
    meta: {title: '财务管理', icon: 'total-today'},
    children: [
      {
        path: 'auditTransferManagement',
        name: 'auditTransferManagement',
        component: () => import('@/views/oms/finance/index'),
        meta: {title: '收支明细', icon: "total-today"}
      },
      {
        path: 'financialManagement',
        name: 'financialManagement',
        component: () => import('@/views/oms/finance/review'),
        meta: {title: '分账管理', icon: "total-today"}
      },
      {
        path: 'reviewDetail',
        name: 'reviewDetail',
        component: () => import('@/views/oms/finance/reviewDetail'),
        meta: {title: '分账详情', icon: "total-today"},
        hidden:true
      }
    ]
  },
  {
    path:'/topic',
    component: Layout,
    redirect: '#',
    name: 'topic',
    meta: {title: '话题管理', icon: 'topic'},
    children: [
      {
        path: 'topic',
        name: 'topicManagement',
        component: () => import('@/views/topic/topic/index'),
        meta: {title: '话题管理', icon: "topic"},
      },
      {
        path: 'updateTopic',
        name: 'updateTopicList',
        component: () => import('@/views/topic/topic/update'),
        meta: {title: '话题修改'},
        hidden:true
      },
      {
        path: 'addTopic',
        name: 'addTopicList',
        component: () => import('@/views/topic/topic/add'),
        meta: {title: '话题新增'},
        hidden:true
      },
    ]
  },
  {
    path:'/comment',
    component: Layout,
    redirect: '#',
    name: 'comment',
    meta: {title: '评论管理', icon: 'comment'},
    children: [
      {
        path: 'dynamicComments',
        name: 'dynamicComments',
        component: () => import('@/views/comment/dynamicComments/index'),
        meta: {title: '动态/日志评论', icon: "dynamic"},
      },
      {
        path: 'buyerComments',
        name: 'buyerComments',
        component: () => import('@/views/comment/buyerComments/index'),
        meta: {title: '买家评论',icon: "maijia"},
      },
    ]
  },


  {
    path:'/integral',
    component: Layout,
    redirect: '#',
    name: 'integral',
    meta: {title: '积分管理', icon: 'jifen'},
    children: [
      {
        path: 'integrationRule',
        name: 'integrationRule',
        component: () => import('@/views/integral/integrationRule/index'),
        meta: {title: '积分规则管理', icon: "guize"},
      },
      {
        path: 'integralRecord',
        name: 'integralRecord',
        component: () => import('@/views/integral/integralRecord/index'),
        meta: {title: '积分明细管理',icon: "mingxi"},
      },
      {
        path: 'updateIntegrationRule',
        name: 'updateIntegrationRule',
        component: () => import('@/views/integral/integrationRule/update'),
        meta: {title: '积分规则编辑'},
        hidden:true
      },
      {
        path: 'IntegralGifts',
        name: 'IntegralGifts',
        component: () => import('@/views/integral/integralGifts/index'),
        meta: {title: '积分好礼管理', icon: "gifts"},
      },
      {
        path: 'updateIntegralGifts',
        name: 'updateIntegralGifts',
        component: () => import('@/views/integral/integralGifts/update'),
        meta: {title: '积分好礼修改'},
        hidden:true
      },
      {
        path: 'addIntegralGifts',
        name: 'addIntegralGifts',
        component: () => import('@/views/integral/integralGifts/add'),
        meta: {title: '积分好礼添加'},
        hidden:true
      },
      {
        path: 'selectSpe',
        name: 'selectSpe',
        component: () => import('@/views/integral/integralGifts/select'),
        meta: {title: '规格与库存查询'},
        hidden:true
      },
      {
        path: 'addSpe',
        name: 'addSpe',
        component: () => import('@/views/integral/integralGifts/addSpe'),
        meta: {title: '规格与库存添加'},
        hidden:true
      },
    ]
  },
  {
    path:'/social',
    component: Layout,
    redirect: '#',
    name: 'social',
    meta: {title: '社交管理', icon: 'social'},
    children: [
      {
        path: 'dynamic',
        name: 'dynamic',
        component: () => import('@/views/social/dynamic/index'),
        meta: {title: '用户动态管理', icon: "dongtai"},
      },
      {
        path: 'dynamicLog',
        name: 'dynamicLog',
        component: () => import('@/views/social/diveLog/index'),
        meta: {title: '潜水日志管理', icon: "dynamicLog"},
      },
      {
        path: 'selectAirbottle',
        name: 'selectAirbottle',
        component: () => import('@/views/social/diveLog/select'),
        meta: {title: '用户气瓶消耗量查询'},
        hidden:true
      },
    ]
  },
  {
    path:'/dmd',
    component: Layout,
    redirect: '#',
    name: 'message',
    meta: {title: '消息中心', icon: 'jifen'},
    children: [
      {
        path: 'integrationRule',
        name: 'integrationRule',
        component: () => import('@/views/dmd/message/index'),
        meta: {title: '消息列表', icon: "guize"},
      },
      {
        path: 'sendMessage',
        name: 'addMessage',
        component: () => import('@/views/dmd/message/add'),
        meta: {title: '发送通知'},
        hidden: true
      },
      {
        path: 'batchSendMessage',
        name: 'batchAddMessage',
        component: () => import('@/views/dmd/message/batchAdd'),
        meta: {title: '批量发送通知'},
        hidden: true
      },
      {
        path: 'addAllMessage',
        name: 'addAllMessage',
        component: () => import('@/views/dmd/message/addAll'),
        meta: {title: '全部用户发送通知'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true},
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

