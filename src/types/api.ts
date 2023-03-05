export interface Response<T> {
  code: number
  message?: string
  data: T
}
export type CommonRes = Response<any>

export interface LoginData {
  email: string
  passwd: string
  captcha: string
}
export interface LoginRes {
  token: string
  _id: string
  email: string
}

export interface RegisterData {
  email: string
  passwd: string
  captcha: string
  nickname?: string
}

export interface UploadFileData {
  url: string
}

export interface UploadFileCheckRes {
  uploaded: boolean
  uploadedList: string[]
  url: string
}
