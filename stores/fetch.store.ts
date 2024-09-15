import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"
import _ from "lodash"

export const useFetchStore = defineStore({
  id: "fetch",
  persist: {
    key: 'fetch',
    paths: [
      'faculties',
      'CTDT',
    ]
  },
  state: () => ({
    faculties: [],
    khoaSelection: '',
    nganhSelection: '',
    CTDT: [],
    ctdtSelection: ''
  }),
  actions: {
    async fetchAll() {
      await this.fetchCTDT()
    }, 
  
    //Requires auth fetching
    async fetchKhoa() {
      const { data, error, pending } = await useAuthFetch(useDomain().apiUri + "/faculties")
      
      if (error.value) {
        data.value = null
      }
      
      if (!_.isEmpty(data.value)) {
        this.faculties = data.value.data.faculties
      }
      
      return { data: _.get(data.value, 'data.faculties', []), pending, error: null }
    },
    
    async fetchCTDT() {
      const { data, error, pending } = await useAuthFetch(useDomain().apiUri + "/agencies")
      
      if (error.value) {
        data.value = null
      }
      
      if (!_.isEmpty(data.value)) {
        this.CTDT = _.get(data.value, 'data.agencies', [])
      }
      
      return { data: _.get(data.value, 'data.agencies', []), pending, error: null }
    },
    
    async fetchCTDTById(id: number) {
      const { data, error, pending } = await useAuthFetch(useDomain().apiUri + `/agencies/${id}`)
      
      if (error.value) {
        data.value = null
      }
      
      if (!_.isEmpty(data.value)) {
      }
      
      return { data: _.get(data.value, 'data', []), pending, error: null }
    },
    
    // End requires auth
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
