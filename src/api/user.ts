import { axios } from '@/utils'
import type { LoginData, LoginRes } from '@/types/api'

// export const login = (obj:LoginData)=>axios.post<LoginRes>('/user/login',obj)

export const loginApi = async (obj: LoginData): Promise<LoginRes> => {
  return axios.post('/user/login', obj)
}

export const userinfoApi = async (): Promise<LoginRes> => {
  return axios.get('/user/info')
}

export interface UserInfo {
  name?: string
  avatar?: string
  jobtitle?: string
  tags?: string[]

}
export const fakeUserApi = async (): Promise<UserInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '花果山大圣',
        avatar: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/woniu.png',
        jobtitle: '除了上班，干啥都行的自由职业程序员',
        tags: ['前端', '全栈', '讲师', '自媒体up主', '专注课程'],
      })
    }, 2000)
  })
}

export interface FunnyCoderObj {
  avatar: string
  name: string
  title: string
  link: string
  urls: {
    icon: string
    link: string
  }[]
}

export const getFunnyCoder = async (): Promise<{ list: FunnyCoderObj[] }> => {
  return axios.get('/funnycoder')
}
