export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  
  // Navigate to login page when user not login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return navigateTo(`/`)
  }
  
  // Prevent navigate to login page when user already login
  if (to.path === '/' && auth.token) {
    return navigateTo(`/dashboard/plo-va-pi`)
  }
})
