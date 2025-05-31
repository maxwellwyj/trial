import request from '@/utils/request'

// //注册接口

// export const userRegisterService = ({username,password,repassword}) =>
//    request.post('/api/reg',{username,password,repassword})

// //登录接口
// export const userLoginService = ({username,password}) =>
//    request.post('/api/login',{username,password})

// 注册接口
export const userRegisterService = ({ username, password, repassword }: { username: string, password: string, repassword: string }) =>
    request.post('/api/reg', { username, password, repassword });

// 登录接口
export const userLoginService = ({ username, password }: { username: string, password: string }) =>
    request.post('/api/login', { username, password });

