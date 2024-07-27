import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"
import { useGuiStore } from "./gui.store"

type AuthRootState = {
  isLoggedIn: boolean
}

export const useAuthStore = defineStore({
  id: "auth",
  persist: [
    {
      key: "isLoggedIn",
      storage: persistedState.sessionStorage,
    },
  ],
  state: () =>
    ({
      isLoggedIn: false,
    } as AuthRootState),
  actions: {
    async login(username: string, password: string) {
      try {
        const domain = useDomain()
        const isLoading = ref(false)
        const res = await $fetch(domain.apiBase + "/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        })

        if (res) {
          this.isLoggedIn = true
          isLoading.value = true
        }

        return isLoading
      } catch (error) {
        console.error(error)
        useGuiStore().showToast(
          "Đăng nhập thất bại, vui lòng thử lại sau",
          "error"
        )
      }
    },

    logOut() {
      this.isLoggedIn = false

      navigateTo("/")
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
