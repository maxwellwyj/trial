import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainter.vue'),
      redirect: '/homepage/manage',
      children: [
        {
          path: '/homepage/manage',
          component: () => import('@/views/homepage/HomepageManage.vue')
        },
        {
          path: '/homepage/channel',
          component: () => import('@/views/homepage/HomepageChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/SimulationScheme',
          component: () => import('@/views/user/UserSimulationScheme.vue')
        },
        {
          path: '/interface/one',
          component: () => import('@/views/interface/interfaceOne.vue')
        },
        {
          path: '/interface/two',
          component: () => import('@/views/interface/interfaceTwo.vue')
        },
        {
          path: '/interface/three',
          component: () => import('@/views/interface/interfaceThree.vue')
        },
        {
          path: '/interface/four',
          component: () => import('@/views/interface/interfaceFour.vue')
        }
      ]
    }
  ]
})

export default router
