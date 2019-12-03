import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Login from '../components/HelloWorld.vue';
import Home from '../components/Home.vue';

export default new Router({
    mode:'history',
    routes: [
        { 
            path: '/', 
            name:'/',
            component:Login
            
        },
        { 
            path: '/Home', 
            name:'/',
            component:Home
            
        },
 
    ]

});