// import axios,{AxiosInstance} from 'axios'
// import {message} from 'antd'
// let service:AxiosInstance = axios.create({
//   timeout:5000,
//   // 前缀
//   baseURL:'/api'
// })

// /* 服务器返回数据的的类型，根据接口文档确定 */

import router from "@/routers/router";

import type { InternalAxiosRequestConfig } from 'axios'
import Axios from 'axios'

import { message } from 'ant-design-vue'

import { storage } from '@/utils/'

export const axios = Axios.create({
  baseURL: '/api',
})

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getToken()
  if (token)
    config.headers!.authorization = `Bearer ${token}`

  config.headers!.apikey = import.meta.env.VITE_API_KEY
  config.headers!.Accept = 'application/json'
  return config
})
axios.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code === 0) {
      return data.data
    }
    else {
      message.error(data.message)
      if (data.code === -666) {
        // 登录失效
        storage.setToken('')
        router.replace('/login')
      }
      return Promise.reject(data)
    }
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error(message)
    return Promise.reject(error)
  },
)

// export default({store, redirect})=>{
//   // 请求拦截
//   service.interceptors.request.use(
//     config=>{
//       // 请求加token
//       const token = window.localStorage.getItem(TOKEN_KEY)
//       // 设置url白名单
//       if(token){
//         config.headers.common['Authorization'] = 'Bearer '+token
//       }
//       return config
//     },
//     err=>{
//       return Promise.reject(err)
//     }
//   )
// // 响应拦截
// service.interceptors.response.use(
//   async response=>{
//     let {data, config} = response
//     // console.log('响应拦截',response)
//     // 写token
//     // 也可以卸载login的逻辑李
//     if(data.code===0){
//       if(config.url ==='/api/user/login'){
//         localStorage.setItem(TOKEN_KEY, data.data.token)
//       }
//     }else if(data.code===-666){
//       // code是-666的 意味着token过期
//       // @todo
//        MessageBox.confirm('登录过期了','过期',{
//         confirmButtonText:'登录',
//         showCancelButton:false,
//         type:'warning'
//       }).then(()=>{
//         localStorage.removeItem(TOKEN_KEY)
//         redirect({ path:'/login'})
//       })

//     }
//     return data
//   },
//   err=>{
//     return Promise.reject(err)
//   }
// )
// }
