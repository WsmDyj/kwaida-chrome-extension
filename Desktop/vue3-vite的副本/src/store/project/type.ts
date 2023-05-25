/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-08 11:44:00
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 09:45:24
 * @FilePath: /pressure-test/src/store/project/type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export interface ProjectVo {
  nodeId: number
  name: string
}
export interface ProjectState {
  projectList: ProjectVo[] | []
  activeProject: number | null
}