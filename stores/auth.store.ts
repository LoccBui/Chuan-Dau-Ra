import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"
import { useGuiStore } from "./gui.store"
import _ from 'lodash'

export const useAuthStore = defineStore({
  id: "auth",
  persist: {
    key: 'authstore',
    paths: [
      'token'
    ]
  }, 
  state: () =>
    ({
      token: null,
      isLoggedIn: false,
    }),
  actions: {
    async login(username: string, password: string) {
      const domain = useDomain()
      const fetch = useFetchStore()
      
      const {data, error} = await useFetch(`${domain.apiUri}/auth/log-in`, {
        method: "POST",
        body: {
          username,
          password,
        },
      })
      
      if (error.value) {
        useShowToast(_.get(error, 'value.data.message', "Đăng nhập thất bại, vui lòng thử lại sau"), "error")
      }
      
      if (data.value) {
        this.isLoggedIn = true
        this.token = _.get(data, 'value.data.tokens.accessToken', null)
        fetch.fetchAll()
      }
      
      return {data}
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
          this.isLoggedIn = true
          isLoading.value = true
        }

        return isLoading
      } catch (error) {
        console.error(error)
        useShowToast("Đăng ký thất bại, vui lòng thử lại sau", "error")
      }
    },

    logOut() {
      this.isLoggedIn = false
      this.token = null
      navigateTo("/")
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
