export const useDomain = () => {
  const runtimeConfig = useRuntimeConfig()

  return runtimeConfig.public
}
