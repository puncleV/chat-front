import Vue from 'vue'
import Router from 'vue-router'
import AuthApi from '../api/auth'

Vue.use(Router)
import socketClient from 'socket.io-client'

let socket = null

const requireAuth = async (to, from, next) => {
  const checkResult = await AuthApi.checkLogin()

  if (checkResult.status !== 'success') {
    alert(`${checkResult.status} ${checkResult.message}`)
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    if (socket === null) {
      socket = socketClient('http://localhost:4444')
    }

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
      name: 'Login',
      path: '/login',
      component: () => {
        return import('../components/login')
      },
      beforeEnter: async (to, from, next) => {
        const { status } = await AuthApi.checkLogin()

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
      props: () => {
        return {
          socket
        }
      },
      component: () => {
        return import('../components/rooms')
      },
      beforeEnter: requireAuth
    },
    {
      name: 'Logout',
      path: '/logout',
      beforeEnter: async (to, from, next) => {
        const { status, message } = await AuthApi.logout()

        if (status === 'success') {
          if(socket !== null) {
            socket.close()
            socket = null
          }
          next({
            name: 'Login'
          })
        } else {
          alert(`${status} ${message}`)
        }
      }
    }
  ]
})

export default router