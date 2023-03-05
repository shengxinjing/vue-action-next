import sparkMd5 from 'spark-md5'
export const CHUNK_SIZE = 1 * 1024 * 1024

export async function md5File(file) {
  const ret = await blobToData(file) as ArrayBuffer
  return sparkMd5.ArrayBuffer.hash(ret)
}
export function blobToData(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      resolve(e.target?.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

export function createFileChunk(file, size = CHUNK_SIZE) {
  const chunkList: { file: File }[] = []
  let cur = 0
  while (cur < file.size) {
    chunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return chunkList
}
export function ext(filename: string): string {
  return filename.split('.').pop() || ''
}
