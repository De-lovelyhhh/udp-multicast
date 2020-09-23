import Vue from 'vue'
import Router from 'vue-router'
import CheckBox from '@/components/CheckBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CheckBox',
      component: CheckBox
    }
  ]
})
