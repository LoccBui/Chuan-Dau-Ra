import { UseFetchOptions } from "nuxt/app"
import { useAuthStore } from "~/stores/auth.store"

export const useAuthFetch = (
  url: string,
  options: UseFetchOptions<any> = {}
) => {
  const authStore = useAuthStore()

  const defaults: UseFetchOptions<any> = {
    // Merge the provided options with the default options
    ...options,
    // Add the authorization header with the token from the auth store
    headers: {
      ...options.headers,
      Authorization: `Bearer ${authStore.token}`,
    },
    onResponse: async function ({ response }) {
      // Handle the 401 error status code
      if (response.status === 401) {
        await authStore.refreshToken()
      }

      // Call any custom onResponse function provided in options
      if (options.onResponse) {
        options.onResponse({ response })
      }
    },
  }

  return useFetch(url, defaults)
}
