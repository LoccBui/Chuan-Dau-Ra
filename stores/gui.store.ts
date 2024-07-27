import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"
import { ElNotification } from "element-plus"

export const useGuiStore = defineStore({
  id: "gui",
  persist: [
    {
      key: "isSidebarMinimized",
      storage: persistedState.sessionStorage,
    },
  ],
  state: () => ({
    isSidebarMinimized: false,
    currentDataSelection: [],
  }),
  actions: {
    showToast(message?: string, type?: string = "info") {
      ElNotification({
        title: "Thông báo",
        message: message || "Lỗi",
        type,
      })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGuiStore, import.meta.hot))
}
