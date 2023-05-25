/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-24 18:20:58
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-17 10:37:41
 * @FilePath: /permission-portal/src/common/hooks/useMicroData.ts
 * @Description: 微应用的一些配置
*/
import { getAppEnv } from '@/utils/env'

type Env = 'staging' | 'development' | 'prt' | 'prod' | 'sgp' | 'sgpPrt'

interface MicroConfig {
  microUrl?: string
  microEnv?: Env
}

// 微应用集合
export const microConfig: any = {
  'permission-micro-app': {
    development: 'https://premission-micro.staging.kuaishou.com',
    staging: 'https://premission-micro.staging.kuaishou.com'
  }
}

export type Name = keyof typeof microConfig

// 获取微应用的配置文件
export function useMicroConfig (name?: Name) {
  const isDev = process.env.NODE_ENV === 'development'
  const env = isDev ? 'development' : getAppEnv()
  const config: MicroConfig = {}
  if (name) {
    config.microUrl = microConfig[name][env]
    config.microEnv = env
  }
  return { config, microConfig, isDev }
}
