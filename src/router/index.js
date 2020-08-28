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
    path: '/about',
    name: '产品管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/tourismManagement',
        name: '旅游管理',
        icon: 'customer-service',
        component: () => import('../views/tourism/list/list.vue')
      },
      {
        path: '/tourismEditor',
        name: '旅游编辑',
        icon: 'customer-service',
        component: () => import('../views/tourism/detail/detail.vue')
      },
      {
        path: '/goodsManagement',
        name: '商品管理',
        icon: 'customer-service',
        component: () => import('../views/goods/list/list.vue')
      },
      {
        path: '/goodsEditor',
        name: '商品编辑',
        icon: 'customer-service',
        component: () => import('../views/goods/detail/detail.vue')
      }
    ]
  },
  {
    path: '/goodsList',
    name: '用户管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
    ]
  },
  {
    path: '/goodsList',
    name: '预约管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
    ]
  },
  {
    path: '/goodsList',
    name: '分销管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/about',
        name: '推荐管理',
        icon: 'customer-service',
        component: () => import('../views/About.vue')
      },
      {
        path: '/about',
        name: '佣金明细',
        icon: 'customer-service',
        component: () => import('../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
