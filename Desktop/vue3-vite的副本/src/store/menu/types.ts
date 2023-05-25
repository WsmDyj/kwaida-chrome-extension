export enum TypeValue {
  menu = 'menu',
  tab = 'tab',
  page = 'page',
  app = 'app',
  button = 'button'
}
export type TypeCode = `${TypeValue}`

export interface UserState {
  activeKey?: string
  menuList: Menus[] | []
  headerMenu?: HeaderMenu[]
  roleCode: string[]
  roleList: Menus[] | []
}
export interface HeaderMenu {
  icon: string
  tabKey: string
  tab: string
}

export interface Menus {
  path: string | undefined
  code: string
  key: string
  icon: string
  enabled?: boolean
  name: string
  title: string
  show: boolean
  typeCode: any
  serviceUrl?: string
  children?: Menus[]
}
