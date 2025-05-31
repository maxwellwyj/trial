import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import {useUserStore} from './modules/user'
// export {useUserStore}
//此处是为了方便App.vue文件中的import {useUserStore} from '@/stores'
export*from './modules/user'