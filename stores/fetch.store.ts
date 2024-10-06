import { acceptHMRUpdate, defineStore } from "pinia"
import { useDomain } from "~/lib/domain"
import _, { method } from "lodash"

export const useFetchStore = defineStore({
  id: "fetch",
  persist: {
    key: "fetch",
    paths: ["faculties", "CTDT"],
  },
  state: () => ({
    faculties: [],
    khoaSelection: "",
    nganhSelection: "",
    CTDT: [],
    ctdtSelection: -1,
  }),
  getters: {
    getNganhByKhoa: (state) => {
      return (
        state.faculties.find((faculty) => faculty.id === state.khoaSelection) ||
        []
      )
    },
    getCTDTbyNganh: (state) => {
      if (_.isEmpty(state.getNganhByKhoa.programs)) return []
      return _.get(state.getNganhByKhoa, "programs[0].educationPrograms", [])
    },
    apiConnector: () => {
      return useDomain().apiUri
    },
  },
  actions: {
    async fetchResources() {
      if (_.isEmpty(this.faculties)) {
        await this.fetchKhoa()
      }

      if (_.isEmpty(this.CTDT)) {
        await this.fetchCTDT()
      }
    },

    //Requires auth fetching
    async fetchKhoa() {
      const { data, error, pending } = await useAuthFetch(
        useDomain().apiUri + "/faculties"
      )

      if (error.value) {
        data.value = null
      }

      if (!_.isEmpty(data.value)) {
        this.faculties = data.value.data.faculties
      }

      return {
        data: _.get(data.value, "data.faculties", []),
        pending,
        error: null,
      }
    },

    async fetchCTDT() {
      const { data, error, pending } = await useAuthFetch(
        useDomain().apiUri + "/agencies"
      )

      if (error.value) {
        data.value = null
      }

      if (!_.isEmpty(data.value)) {
        this.CTDT = _.get(data.value, "data.agencies", [])
      }

      return {
        data: _.get(data.value, "data.agencies", []),
        pending,
        error: null,
      }
    },

    async fetchCTDTById(id: number) {
      const { data, error, pending } = await useAuthFetch(
        useDomain().apiUri + `/agencies/${id}`
      )

      if (error.value) {
        data.value = null
      }

      if (!_.isEmpty(data.value)) {
      }

      return { data: _.get(data.value, "data", []), pending, error: null }
    },

    async fetchPLOById(idCTDT: number) {
      const {
        data: items,
        error,
        pending,
      } = await useAuthFetch(`${useApiConnector()}/plos?eduProgramId=${idCTDT}`)

      if (error.value) {
        items.value = []
      }

      const data = _.get(items.value, "data", [])

      return { data, pending, error }
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

    // PLO
    async addNewPLO(
      ploCode: string,
      eduProgramId: number,
      description: string
    ) {
      const { data, error, pending } = await useAuthFetch(
        `${this.apiConnector}/plos`,
        {
          method: "POST",
          body: {
            code: ploCode,
            eduProgramId: eduProgramId,
            description,
          },
        }
      )

      if (data.value) {
        useShowToast(_.get(data.value, "message", "Thêm thành công"), "success")
      }

      if (error.value) {
        useShowToast(
          _.get(error.value, "data.message", "Thêm thất bại"),
          "error"
        )
      }

      return { data, error, pending }
    },

    async editPLO(
      idPLO: string,
      code: string,
      description: string,
      eduProgramId: number
    ) {
      const { data, error, pending } = await useAuthFetch(
        `${this.apiConnector}/plos/${idPLO}`,
        {
          method: "PATCH",
          body: {
            code,
            description,
            eduProgramId,
          },
        }
      )

      if (data.value) {
        useShowToast(_.get(data.value, "message", "Sửa thành công"), "success")
      }

      if (error.value) {
        useShowToast(
          _.get(error.value, "data.message", "Sửa thất bại"),
          "error"
        )
      }

      return { data, error, pending }
    },

    async deletePLO(ploID: number | Array<any>) {
      const { data, error, pending } = await useAuthFetch(
        `${this.apiConnector}/plos`,
        {
          method: "DELETE",
          body: {
            ploIds: [ploID],
          },
        }
      )

      if (data.value) {
        useShowToast(_.get(data.value, "message", "Xóa thành công"), "success")
      }

      if (error.value) {
        useShowToast(
          _.get(error.value, "data.message", "Xóa thất bại"),
          "error"
        )
      }

      return { data, error, pending }
    },

    async getPIByPLOId(idPLO: string) {
      const {
        data: items,
        error,
        pending,
      } = await useAuthFetch(`${useApiConnector()}/plos/${idPLO}`)

      if (error.value) {
        items.value = []
      }

      const data = _.get(items.value, "data", [])

      return { data, pending, error }
    },

    // PI
    async addNewPI(
      code: string,
      ploId: number,
      eduProgramId: number,
      description: string
    ) {
      const { data, error, pending } = await useAuthFetch(
        `${this.apiConnector}/pis`,
        {
          method: "POST",
          body: {
            code,
            ploId,
            eduProgramId,
            description,
          },
        }
      )

      if (data.value) {
        useShowToast(_.get(data.value, "message", "Thêm thành công"), "success")
      }

      if (error.value) {
        useShowToast(
          _.get(error.value, "data.message", "Thêm thất bại"),
          "error"
        )
      }

      return { data, error, pending }
    },

    async editPI(
      idPI: string,
      ploId: number,
      code: string,
      description: string,
      eduProgramId: number
    ) {
      const { data, error, pending } = await useAuthFetch(
        `${this.apiConnector}/pis/${idPI}`,
        {
          method: "PATCH",
          body: {
            code,
            ploId,
            description,
            eduProgramId,
          },
        }
      )

      if (data.value) {
        useShowToast(_.get(data.value, "message", "Sửa thành công"), "success")
      }

      if (error.value) {
        useShowToast(
          _.get(error.value, "data.message", "Sửa thất bại"),
          "error"
        )
      }

      return { data, error, pending }
    },

    async deletePI(piIds: number | Array<any>) {
      const { data, error, pending } = await useAuthFetch(
        `${this.apiConnector}/pis`,
        {
          method: "DELETE",
          body: {
            piIds: [piIds],
          },
        }
      )

      if (data.value) {
        useShowToast(_.get(data.value, "message", "Xóa thành công"), "success")
      }

      if (error.value) {
        useShowToast(
          _.get(error.value, "data.message", "Xóa thất bại"),
          "error"
        )
      }

      return { data, error, pending }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFetchStore, import.meta.hot))
}
