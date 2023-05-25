/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:16:21
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 15:38:47
 * @Description: userInfo类型说明
 */
export interface UserInfo {
  kwaiUserId?: number // Kim的用户id
  username: string // 用户英文名称
  name: string // 中文名称
  priority: string
  email: string // 邮箱
  avatarUrl: string // 用户头像
}

export interface UserState {
  userInfo: Nullable<UserInfo>
  logined: boolean
}
