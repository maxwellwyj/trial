//TS文件一般使用显示或泛式类型的数据

import {defineStore} from 'pinia'
import {ref} from 'vue'

//用户模块 token setToken removeToken
export const useUserStore = defineStore('big-user',() =>{
  const token = ref('')
  const setToken = <T>(newToken: T) => { // 使用泛型声明 newToken 的类型
    token.value = newToken.toString(); // 在这里假设将 newToken 转换为字符串
  }
  const removeToken = () =>{
    token.value = ''
  }
  return {
    token,
    setToken,
    removeToken
  }
},
{
  persist: true,
},
)
