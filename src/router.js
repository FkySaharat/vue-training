import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/InputTodo.vue'
import Store from './components/Store/Home.vue'
Vue.use(VueRouter)


const routes =[
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/store',
        name: 'store',
        component:Store
    },
  
    
]

const router = new VueRouter({
   
    routes
})

export default router