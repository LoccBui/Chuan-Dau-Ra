import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"
import _ from "lodash"

export const useAuthStore = defineStore({
  id: "auth",
  persist: {
    key: "authstore",
    paths: ["token"],
  },
  state: () => ({
    token: null,
  }),
  actions: {
    async login(username: string, password: string) {
      const fetch = useFetchStore()

      const { data, error, pending } = await useFetch(
        `${useApiConnector()}/auth/log-in`,
        {
          method: "POST",
          body: {
            username,
            password,
          },
        }
      )

      if (data.value) {
        navigateTo("/dashboard/plo-va-pi")
        this.token = _.get(data, "value.data.tokens.accessToken", null)
        fetch.fetchResources()
      } else {
        useShowToast(
          _.get(
            error,
            "value.data.message",
            "Đăng nhập thất bại, vui lòng thử lại sau"
          ),
          "error"
        )
      }

      return { data, pending }
    },

    async refreshToken() {
      const domain = useDomain()

      const { data, error } = await useFetch(`${domain.apiUri}/auth/refresh`)

      if (error.value) {
        this.token = null
        navigateTo("/")
      }

      if (data.value) {
        this.token = _.get(data, "value.data.tokens.accessToken", null)
      }

      return { data, error }
    },

    async register(username: string, password: string) {
      try {
        const domain = useDomain()
        const isLoading = ref(false)
        const res = await $fetch(domain.apiBase + "/register", {
          method: "POST",
          body: {
            username,
            password,
          },
        })

        if (res) {
          isLoading.value = true
        }

        return isLoading
      } catch (error) {
        console.error(error)
        useShowToast("Đăng ký thất bại, vui lòng thử lại sau", "error")
      }
    },

    logOut() {
      this.token = null
      navigateTo("/")
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
