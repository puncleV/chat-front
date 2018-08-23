import Vue from 'vue'
import Router from 'vue-router'
import AuthApi from '../api/auth'

Vue.use(Router)
const requireAuth = async (to, from, next) => {
  const checkResult = await AuthApi.checkLogin()

  if (checkResult.status !== 'success') {
    alert(`${checkResult.status} ${checkResult.message}`)
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}


const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/rooms'
    },
    {
      name: 'login',
      path: '/login',
      component: () => {
        return import('../components/login')
      },
      beforeEnter: async (to, from, next) => {
        const {status} = await AuthApi.checkLogin()

        if (status === 'success') {
          next({
            path: '/'
          })

        } else {
          next()
        }
      }
    },
    {
      path: '/rooms',
      name: 'Rooms',
      component: () => {
        return import('../components/rooms')
      },
      beforeEnter: requireAuth
    },
    {
      name: 'logout',
      path: '/logout',
      beforeEnter: async (to, from, next) => {
        const { status, message } = await AuthApi.logout()

        if (status === 'success') {
          next({
            name: 'login'
          })
        } else {
          alert(`${status} ${message}`)
        }
      }
    }
  ]
})

export default router