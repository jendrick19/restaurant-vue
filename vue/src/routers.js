import home from "./components/home.vue"
import signUp from "./components/signUp.vue"
import login from "./components/login.vue"
import addRest from "./components/addRest.vue"
import updateRest from "./components/updateRest.vue"

import { createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        name:"home",
        component: home,
        path:"/"
    },
    {
        name:"signUp",
        component: signUp,
        path:"/sign-up"
    },
    {
        name:"login",
        component: login,
        path:"/login"
    },
    {
        name:"addRest",
        component:addRest,
        path:"/add-Rest"
    },
    {
        name:"updateRest",
        component:updateRest,
        path:"/update-Rest/:id"
    }
]
const router = createRouter(
    {
        history: createWebHistory(),
        routes,
    })

export default router

