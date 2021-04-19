import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Shouye from './components/Shouye.vue'
import Index from './views/Index.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/shouye',
            name: 'shouye',
            component: Shouye,
            redirect: '/shouye/index',
            children: [{
                path: 'index',
                name: 'index',
                component: Index
            }, {
                path: "bclass",
                name: 'bclass',
                component: () =>
                    import ('./views/Bclass')
            }, {
                path: "bdormitory",
                name: 'bdormitory',
                component: () =>
                    import ('./views/Bdormitory')
            }, {
                path: "bstudent",
                name: 'bstudent',
                component: () =>
                    import ('./views/Bstudent')
            }]
        }
    ]
})