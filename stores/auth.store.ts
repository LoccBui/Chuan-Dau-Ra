import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"

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
      const domain = useDomain()
      const isLoading = ref(false)

      const { data, status } = await useFetch(domain.apiBase + "/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      })

      if (status.value === "success") {
        this.isLoggedIn = true
        isLoading.value = true
      }

      return isLoading
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
