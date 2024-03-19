import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/components/HelloWorld.vue'
import TodoListView from '@/components/views/doto-list.vue'

const routes = [
    { path: '/home', component: HomeView },
    { path: '/todo-list', component: TodoListView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router