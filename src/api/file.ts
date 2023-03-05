import type { UploadFileCheckRes } from '@/types/api'
import { axios } from '@/utils'

export const checkFile = async (hash: string, ext: string): Promise<UploadFileCheckRes> => {
  return axios.post('/file/check', { hash, ext })
}
