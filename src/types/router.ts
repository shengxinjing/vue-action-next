export interface MetaObject {
  keepAlive?: boolean
  auth?: boolean
  title: string
  key?: string
  icon?: JSX.Element
  index?: number
}
export interface MyRouteObject {
  children?: MyRouteObject[]
  element?: React.ReactNode
  path?: string
  meta?: MetaObject
}
