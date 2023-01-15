import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import DashBoard from "@/views/DashBoard.vue";
import CreateTest from "@/views/CreateTest.vue";
import TestsView from "@/views/TestsView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard
  },
  {
    path: '/create',
    name: 'create',
    component: CreateTest
  },
  {
    path: '/tests/:postId?:',
    name: 'TestView',
    component: TestsView,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
