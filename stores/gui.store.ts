import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"

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
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGuiStore, import.meta.hot))
}
