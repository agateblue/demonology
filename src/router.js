import { createRouter, createWebHashHistory } from 'vue-router'
import About from './views/About.vue'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import Statistics from './views/Statistics.vue'
import Story from './views/Story.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/story',
    name: 'Story',
    component: Story
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
