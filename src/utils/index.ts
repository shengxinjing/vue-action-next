// import { resolvePath } from 'react-router-dom'
import type { MyRouteObject } from '@/types/router'
/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export function searchRoute(path: string, routes: MyRouteObject[] = []): MyRouteObject {
  let result: MyRouteObject = {}
  for (const item of routes) {
    if (item.path === path)
      return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length)
        result = res
    }
  }
  return result
}

// export function normorizeRoute(routes: MyRouteObject[] = [], isSort = true): MyRouteObject[] {
//   const result: MyRouteObject[] = []
//   for (const item of routes) {
//     if (item.children) {
//       item.children.forEach((child) => {
//         child.path = resolvePath(child.path!, item.path).pathname
//       })
//       result.push({
//         ...item,
//         children: normorizeRoute(item.children, false),
//       })
//     }
//     else {
//       result.push(item)
//     }
//   }
//   // 只排序顶层的
//   if (isSort) {
//     result.sort((a, b) => {
//       return a.meta!.index! - b.meta!.index!
//     })
//   }

//   return result
// }
export function getOpenKeys(path: string): string[] {
  let i = 1
  const arr: string[] = []
  while (true) {
    i = path.indexOf('/', i)
    if (i === -1)
      break
    arr.push(path.slice(0, i))
    i = path.indexOf('/', i) + 1
  }
  return arr
}

// @todo 报错处理
export async function limitPromise<Task, Result>({
  limit,
  items,
  fn,
}: {
  limit: number
  items: Task[]
  fn: (item: Task) => Promise<Result>
}): Promise<Result[]> {
  const promises: Promise<Result>[] = []
  const pool = new Set<Promise<Result>>()
  for (const item of items) {
    const promise = fn(item)
    promises.push(promise)
    pool.add(promise)
    const clean = () => pool.delete(promise)
    promise.then(clean)
    if (pool.size >= limit)
      await Promise.race(pool)
  }
  return Promise.all(promises)
}

// @todo 报错重试
export function plimit(maxCount: number, retry = 0) {
  interface Task {
    cb: () => Promise<any>
    error: number
  }
  const queue: Task[] = []
  let activeCount = 0

  function runNext() {
    if (queue.length === 0)
      return
    const t = queue.shift() as Task
    try {
      t.cb()
    }
    catch (e) {
      // 报错了重试
      if (t.error < retry) {
        t.error++
        queue.unshift(t)
        runNext()
      }
    }
  }
  const next = () => {
    // 下一个任务
    activeCount--
    runNext()
  }
  const run = async (fn, resolve, args) => {
    // 执行一个函数
    activeCount++
    const result = (async () => fn(...args))()
    resolve(result)
    await result
    next() // 下一个
  }
  const push = async (fn, resolve, args) => {
    queue.push({
      cb: run.bind(null, fn, resolve, args),
      error: 0,
    })
    if (activeCount < maxCount && queue.length > 0) {
      // 队列没满 并且还有任务 启动任务
      runNext()
    }
  }

  const runner = (fn, ...args) => {
    return new Promise((resolve) => {
      push(fn, resolve, args)
    })
  }
  return runner
}
export * from './config'
export * from './axios'
export * from './storage'
export * from './canvas'
export * from './file'
