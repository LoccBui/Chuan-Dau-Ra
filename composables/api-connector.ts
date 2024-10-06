import { useDomain } from "~/lib/domain"

export const useApiConnector = () => {
  const domain = useDomain()

  return domain.apiUri
}
