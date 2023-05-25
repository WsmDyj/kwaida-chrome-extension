/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:09:59
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 09:48:05
 * @Description: 项目列表
 */
import { defineStore } from 'pinia';
import { store } from '@/store';
import { ProjectState, ProjectVo } from '@/store/project/type'
import { getBusinessRemote } from '@/services/common'

const localStorageProject = 'activeTab'

const cachId = localStorage.getItem(localStorageProject) 

export const useProjectStoreFunc = defineStore({
  id: 'app-project',
  state: (): ProjectState => ({
    projectList: [],
    activeProject: null,
  }),
  getters: {
    getProjectList (): ProjectVo[] {
      return this.projectList
    },
    getActiveProject (): number {
      const _cachId = cachId && Number(cachId) || null
      return (this.activeProject || _cachId) as number
    }
  },
  actions: {
    setProjectLists (info: ProjectVo[] | []) {
      this.projectList = info
    },
    setActiveProject (id: number) {
      localStorage.setItem(localStorageProject, String(id))
      this.activeProject = id
    },
    // 获取项目列表
    async getProjectRemote (): Promise<ProjectVo[] | []> {
      const { data = [] } = await getBusinessRemote()
      if (data.length) {
        this.setProjectLists(data)
        !cachId && this.setActiveProject(data[0].nodeId as number)
      }
      return data
    }
  }
})

export function useProjectStore () {
  return useProjectStoreFunc(store)
}
