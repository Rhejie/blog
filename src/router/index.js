import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import * as auth from '../api/auth_api/auth_api'

Vue.use(VueRouter)

const routes = [
  {
      path: '/home',
      component: () => import('../views/Home.vue'),
      props: true,
      children : [
          {
              path: '',
              name: 'Blogs',
              props: true,
              component: () => import('../views/Blogs.vue')
          },
          {
              path: '/create',
              name: 'Create Blog',
              props: true,
              component: () => import('../views/CreateBlog.vue')
          }
      ],
      beforeEnter(to, from, next) {
        if(!auth.isLoggedIn()) {
            next('/login')
        }
        else {
          next();
        }
      }
  },
  {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
      beforeEnter(to, from, next) {
        if(!auth.isLoggedIn()) {
            next()
        }
        else {
          next('/');
        }
      }
  },
  {

      path: '/',
      component: () => import('../views/Welcome.vue'),
      children: [
          {
              path: '',
              name: 'Welcome Blogs',
              component: () => import('../views/WelomeBlogs.vue')
          }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
