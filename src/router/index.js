import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AllMedia from '@/components/AllMedia'
import Games from '@/components/Games'
import Movies from '@/components/Movies'
import About from '@/components/About'
import AddMedia from '@/components/AddMedia'
import ViewMedia from '@/components/ViewMedia'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/allmedia',
      name: 'AllMedia',
      component: AllMedia
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/addmedia',
      name: 'AddMedia',
      component: AddMedia
    },
    {
      path: '/media/:mediaId',
      name: 'ViewMedia',
      component: ViewMedia
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
