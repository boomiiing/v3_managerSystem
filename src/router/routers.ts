export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta:{
      title:'登录'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta:{
      title:'Layout'
    },
    children:[
      {
        path:'home',
        component:() => import('@/views/home/index.vue'),
        name:'home',
        meta:{
          title:'首页'
        },
        children:[
          {
            path:'ceshi',
            component:() => import('@/views/home/index.vue'),
            name:'home',
            meta:{
              title:'ceshi'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/ceshi123',
    component: () => import('@/layout/index.vue'),
    name: 'Layout123',
    meta:{
      title:'来来来'
    },
    children:[
      {
        path:'home2',
        component:() => import('@/views/home/index.vue'),
        name:'home',
        meta:{
          title:'水电费'
        },
      },
      {
        path:'ceshi333',
        component:() => import('@/views/home/index.vue'),
        name:'home',
        meta:{
          title:'阿萨德'
        },
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta:{
      title:'404'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta:{
      title:'重定向'
    }
  },
]
