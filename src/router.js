import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyFriends from './views/MyFriends.vue';
import MyGoals from './views/MyGoals.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import {Globals} from '@/models/api';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // BELOW: NOT A COMMENT, a chunk name, the final destination
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/MyFriends',
      name: 'myfriends',
      component: MyFriends,
    },
    {
      path: '/MyGoals',
      name: 'mygoals',
      component: MyGoals,
    },
    {
      path: '/Register',
      name: 'register',
      component: Register,
      },
    {
      path: '/Login',
      name: 'login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicRoutes = ['home', 'login', 'register'];
  if(!publicRoutes.includes(to.name) && !Globals.user){
    return next('login');
  }
  next();
})

export default router;
