// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/css/main.scss"],
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: true,
        },
      },
    ],
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL,
      apiUri: process.env.API_URL
    },
  },
  postcss: {
    // @see: https://tailwindcss.com/docs/guides/nuxtjs
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
})
