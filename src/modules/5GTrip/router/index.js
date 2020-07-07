import Vue from 'vue'
import Router from 'vue-router'

import LocationTab from '../pages/LocationTab'
import ThemeTab from '../pages/ThemeTab'
import DetailPage from '../pages/Detail'
import SearchPage from '../pages/Search'
import PlayPage from '../pages/Play'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/5GTravel/location'
    },
    {
      path: '/5GTravel/location',
      name: '5GTravel/location',
      component: LocationTab
    },
    {
      path: '/5GTravel/theme',
      name: '5GTravel/theme',
      component: ThemeTab
    },
    {
      path: '/5GTravel/detail',
      name: '5GTravel/detail',
      component: DetailPage
    },
    {
      path: '/5GTravel/search/:keyword',
      name: '5GTravel/search',
      component: SearchPage
    },
    {
      path: '/5GTravel/play/:url',
      name: '5GTravel/play',
      component: PlayPage
    },
    {
      path: '*',
      name: '*',
      redirect: '/5GTravel/location'
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})
