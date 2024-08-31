import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"
import _ from "lodash"

export const useFetchStore = defineStore({
  id: "fetch",
  persist: [],
  state: () => ({}),
  actions: {
    async fetchMonHocAndCLO() {
      const { data, pending } = await useFetch(useDomain().apiBase + "/sample")
      return { data, pending }
    },
    async fetchMaTranDeThi() {
      const { data, pending } = await useFetch(useDomain().apiBase + "/sample")
      return { data, pending }
    },
    async fetchMappingMHAndCDR() {
      const { data, pending } = await useFetch(useDomain().apiBase + "/sample")
      return { data, pending }
    },
    async fetchThongTinChung() {
      const { data, pending } = await useFetch(useDomain().apiBase + "/sample")
      return { data, pending }
    },
    async fetchMappingCDRHocPhanAndBaiHoc() {
      const { data, pending } = await useFetch(useDomain().apiBase + "/sample")
      return { data, pending }
    },
    async fetchChuanDauRaHocPhan() {
      const { data, pending } = await useFetch(useDomain().apiBase + "/sample")
      return { data, pending }
    },
    async fetchDanhGiaMonHoc() {
      const { data, pending } = await useFetch(useDomain().apiBase + "/sample")
      return { data, pending }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFetchStore, import.meta.hot))
}
