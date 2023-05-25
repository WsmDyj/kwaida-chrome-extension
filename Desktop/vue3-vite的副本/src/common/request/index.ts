/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 10:40:14
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 11:30:59
 * @Description: 基于axios封装的请求
 */
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { cloneDeep, isEqual, has, merge } from 'lodash-es'
import { PageEnum } from '@/const/pageEnum'
import { message, notification } from 'ant-design-vue'
import { getApiHost } from '@/utils/env'

// prefix前缀，默认api
export const serveTypeMap = {
  mock: '/api/api-docs',
  api: '/api/pressure-test/api',
  kagura: '/api/kagura/',
  kconf: '/api/kconf/',
  toolkit: '/api/kg-toolkit/api'
}

// 响应状态，code值
enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500
}
// header格式
enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
// 请求参数配置文件

export type PrefixEnum = keyof typeof serveTypeMap
interface RequestOptions {
  serveType?: PrefixEnum
  mock?: boolean
  errorShowMessage?: boolean
  errorMessage?: string | undefined
  [k: string]: unknown
}

interface CreateAxiosOptions extends AxiosRequestConfig, RequestOptions {
  requestOptions?: Partial<RequestOptions>
  mockHost?: string
  successCode?: number
  noMockPrefix?: string[]
}

export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export class Http {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions
  constructor (options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }
  /**
   * @description: 拦截器配置
   */
  private setupInterceptors () {
    // 响应拦截器处理
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        this.checkCode(response)
        return response.data
      },
      (error) => {
        const { response } = error
        if (response) {
          return this.handleError(response)
        }
        message.error(error.message)
        return Promise.reject(error)
      }
    )
  }
  // 后端code拦截
  private checkCode (response: AxiosResponse<Result> | any) {
    const { data = {} } = response
    if (data.code === 1002) {
      const casLoginUrl = `${PageEnum.SSO_LOGIN_URL}/cas/login`
      const service = encodeURIComponent(data.ssoCallBackUrl)
      const loginUrl = `${casLoginUrl}?service=${service}`
      window.location.replace(loginUrl)
      return
    }
    const isShowError = has(response.config, 'errorShowMessage')
      ? response.config.errorShowMessage
      : response.config.requestOptions.errorShowMessage
    if (!isEqual(data.code, this.options.successCode) && isShowError) {
      notification.error({
        message: `服务端接口报错: ${response.config?.origin}`,
        description: response.config.requestOptions.errorMessage || data.msg,
        style: {
          color: 'red'
        }
      })
    }
  }
  // http 状态码拦截
  private handleError (errorRes: AxiosResponse) {
    const { status, statusText } = errorRes
    switch (status) {
    case StatusCode.InternalServerError:
      message.error(`服务器错误:${statusText}`)
      break
    case StatusCode.Forbidden:
      message.error(`服务拒绝访问:${statusText}`)
      break
    case StatusCode.Unauthorized:
      message.error(`客户端未被授权:${statusText}`)
      break
    default:
      message.error(`请求错误:${status}-${statusText}`)
      break
    }
    return Promise.reject(errorRes)
  }
  // 请求之前处理config
  private beforeRequestHook (url: string, config: any, options: RequestOptions) {
    const { mock, serveType = 'api' } = options
    let prefix = serveTypeMap[serveType]
    let host = getApiHost()
    if (mock && !this.options.noMockPrefix?.includes(serveType)) {
      config.withCredentials = false
      host = ''
      prefix = serveTypeMap.mock
    }
    config.origin = url
    if (!['https', 'http'].some((it) => url.includes(it))) {
      config.url = host + prefix + url
    } else {
      config.url = url
    }
    config.requestOptions = options
    config.headers = options.headers
    return config
  }
  request<T = any> (url: string, config: CreateAxiosOptions, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)

    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    // 兼容直接在config配置
    requestOptions &&
      Object.keys(requestOptions).forEach((key) => {
        if (has(config, key)) {
          opt[key] = config[key]
        }
      })
    conf = this.beforeRequestHook(url, conf, opt)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(merge(conf, this.options))
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          reject(e)
        })
    })
  }
  get<T = any, R = Result<T>> (url: string, config: CreateAxiosOptions, options?: RequestOptions): Promise<R> {
    return this.request(url, { ...config, method: 'GET' }, options)
  }

  post<T = any, R = Result<T>> (url: string, data?: AxiosRequestConfig['data'], options?: RequestOptions): Promise<R> {
    return this.request(url, { data, method: 'POST' }, options)
  }

  put<T = any, R = Result<T>> (url: string, data?: AxiosRequestConfig['data'], options?: RequestOptions): Promise<R> {
    return this.request(url, { data, method: 'PUT' }, options)
  }

  delete<T = any, R = Result<T>> (url: string, data?: AxiosRequestConfig['data'], options?: RequestOptions): Promise<R> {
    return this.request(url, { data, method: 'DELETE' }, options)
  }
}

export const http = new Http({
  timeout: 3 * 10 * 1000,
  withCredentials: true,
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  },
  mockHost: 'http://localhost:3000',
  // 不需要拦截的接口前缀
  noMockPrefix: ['kagura', 'kconf', 'toolkit'],
  // 后端接口成功code值
  successCode: 0,
  requestOptions: {
    serveType: 'api',
    // 全局mock开关
    mock: true,
    // 接口错误是否展示弹窗
    errorShowMessage: true,
    // 自定义错误信息
    errorMessage: ''
  }
})
