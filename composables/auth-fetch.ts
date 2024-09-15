import { UseFetchOptions } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth.store'

export const useAuthFetch = (url: string, options: UseFetchOptions<any> = {}) => {
  const authStore = useAuthStore()

  const defaults: UseFetchOptions<any> = {
    // Merge the provided options with the default options
    ...options,
    // Add the authorization header with the token from the auth store
    headers: {
      ...options.headers,
      Authorization: `Bearer ${authStore.token}`,
    },
  }

  return useFetch(url, defaults)
}
