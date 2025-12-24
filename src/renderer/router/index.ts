import { HelloScreen } from '@/renderer/screens'
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HelloScreen,
      meta: {
        titleKey: 'title.main'
      }
    }
  ]
})
