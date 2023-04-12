import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import DashBoard from "@/views/DashBoard.vue";
import CreateTest from "@/views/CreateTest.vue";
import TestsView from "@/views/TestsView.vue";
import SignIn from "@/views/SignIn.vue";
import {auth} from "@/firebase";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/create',
    name: 'create',
    component: CreateTest,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/tests/:postId?:',
    name: 'TestView',
    component: TestsView,
    props: true
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (auth.currentUser){
      next();
    }
    else {
      alert("You dont have acces!")
      next("/");
    }
  }
  else {
    next()
  }
})
export default router
