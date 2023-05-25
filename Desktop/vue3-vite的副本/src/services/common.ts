import { http as request } from '@/common/request'
import { UserInfo } from '@/store/user/types'

import config from '../../config.json'
const projectCode = config.projectCode

// 获取用户信息
export const getUserInfoRemote = async (): Promise<UserInfo | null> => {
  const { data } = await request.get<UserInfo>('user/currentInfo', {
    serveType: 'kagura'
  })
  return data
}
// 获取所有菜单
export const getAllMenuListRemote = async () => {
  const { data } = await request.get(`/permission/resource/${projectCode}/queryAllResource`, {
    serveType: 'toolkit'
  })
  return data || []
}
// 获取权限菜单
export const getMenuListRemote = async (params?: { nodeId: number } | null) => {
  const { data } = await request.get(`/permission/resource/${projectCode}/queryUserResource`, {
    serveType: 'toolkit',
    params
  })
  return data || []
}
// 获取管理员
export const getAdminListRemote = async (params: { resourceCode: string; nodeId?: number | null }) => {
  const { data = [] } = await request.get(`/permission/user-role/${projectCode}/queryAllAdmin`, {
    params,
    serveType: 'toolkit'
  })
  return data
}
// 获取业务节点
export const getBusinessRemote = async () => {
  const data = await request.get(`/permission/resource/${projectCode}/queryByUser`, {
    serveType: 'toolkit'
  })
  return data
}
