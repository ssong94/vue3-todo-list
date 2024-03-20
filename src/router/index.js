import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@/components/views/HelloWorld.vue'
import TodoList from '@/components/views/TodoList.vue'
import Test from '@/components/views/TestView.vue'

const routes = [
    { path: '/home', component: Home },
    { path: '/todo-list', component: TodoList },
    { path: '/test', component: Test },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router