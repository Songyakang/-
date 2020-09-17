import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    icon: 'account-book',
    hidden: true
  },
  {
    path: '/tourismManagement',
    name: '产品管理',
    component: Layout,
    icon: 'flag',
    hidden: false,
    children: [
      {
        path: '/tourismManagement',
        name: '旅游管理',
        icon: 'flag',
        component: () => import('../views/tourism/list/list.vue')
      },
      {
        path: '/tourismEditor',
        name: '旅游编辑',
        icon: 'customer-service',
        hidden: true,
        component: () => import('../views/tourism/detail/detail.vue')
      },
      {
        path: '/goodsManagement',
        name: '商品管理',
        icon: 'property-safety',
        component: () => import('../views/goods/list/list.vue')
      },
      {
        path: '/goodsEditor',
        name: '商品编辑',
        hidden: true,
        icon: 'customer-service',
        component: () => import('../views/goods/detail/detail.vue')
      }
    ]
  },
  {
    path: '/userList',
    name: '用户管理',
    component: Layout,
    icon: 'customer-service',
    hidden: false,
    children: [
      {
        path: '/userList',
        name: '用户列表',
        hidden: true,
        icon: 'customer-service',
        component: () => import('../views/user/user.vue')
      }
    ]
  },
  {
    path: '/subscribeList',
    name: '预约管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/subscribeList',
        name: '预定列表',
        hidden: true,
        icon: 'customer-service',
        component: () => import('../views/subscribe/index/index.vue')
      }
    ]
  },
  {
    path: '/distributionlist',
    name: '分销管理',
    component: Layout,
    hidden: false,
    icon: 'team',
    children: [
      {
        path: '/distributionlist',
        name: '推荐管理',
        icon: 'team',
        component: () => import('../views/distribution/distributionlist/distributionlist.vue')
      },
      {
        path: '/commissionlist',
        name: '佣金明细',
        icon: 'pie-chart',
        component: () => import('../views/distribution/commissionlist/commissionlist.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
