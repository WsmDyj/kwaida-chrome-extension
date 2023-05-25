/**
 * 文件下载
 * @param params
 * @param fileName
 * @param url
 */
import { http } from '@/common/request';
import { message } from 'ant-design-vue';

export const downloadFile = async (params: unknown, fileName = '下载文件.csv', url = 'blobstore/download') => {
  const res = await http.post(url, params, {
    responseType: 'blob'
  })

  if (res instanceof Blob) {
    const type = res.type
    // 导出失败
    if (type === 'application/json') {
      // 结果为string
      const text = await res.text()
      // 转成对象
      const data = JSON.parse(text)
      if (data.code !== 0) {
        message.error(data.msg)
      }
    } else {
      // 导出成功
      const link = document.createElement('a')
      link.style.display = 'none'
      document.body.appendChild(link)
      const blob = new Blob([res], { type })
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }
}
/**
 * 常量转换成选项数组
 * @param textObj
 * @param valArr
 */
export function constToOptions<T, V extends keyof T> (
  textObj: T,
  valArr: V[],
  label = 'label',
  value = 'value'
) {
  return valArr.map(item => {
    return {
      [label]: textObj[item],
      [value]: item
    }
  })
}


/**
 * obj = {
 *   a:1,
 *   b:2
 * }
 *
 * 1. 获取key 作为类型
 * keyof typeof obj => "a" | "b"
 * 2. 如何获取value作为类型
 * type valueModel = ValueOf<typeof obj>
 * 1 ｜ 2
 */
export type ValueOf<T> = T[keyof T];
