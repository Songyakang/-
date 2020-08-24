import router from '../router'

//路由对象
let routes = Object.fromEntries(router.options.routes.map(e => {
    if(Object.hasOwnProperty.call(e, 'children')){
        e = [e.path, e.children.map(i => i.path)]
    }else{
        e = e.path
    }
    return e
}).flat(10).map(e => [e, true]))

//路由前置守卫
router.beforeEach((to, from, next) => {
    if(routes[to.path]){
        next()
    }else{
        next({path: '/login'})
    }
})

export default router