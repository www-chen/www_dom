import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Video from '../views/Video'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/video',
    name:'Video',
    component:Video
  }
]

const router = new VueRouter({
  routes
})

export default router
