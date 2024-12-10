import { acceptHMRUpdate, defineStore } from "pinia"
import _ from "lodash"

export const useMonHocVaChuanDauRaStore = defineStore({
  id: "monhocvachuandaura",
  state: () => ({
    
  }),
  getters: {},
  actions: {
    async editMonHocVaChuanDauRa(
      idPLO: string,
      code: string,
      subjectId: number,
      maxScore: number,
      name: string,
      eduProgramId: number
    ) {
      const { data, error, pending } = await useAuthFetch(
        `${useApiConnector()}/clos/${idPLO}`,
        {
          method: "PATCH",
          body: {
            code,
            subjectId,
            maxScore,
            name,
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
    
    async addNewMonHoc(
      code: string,
      subjectId: number,
      maxScore: number,
      name: string,
      eduProgramId: number
    ) {
      const { data, error, pending } = await useAuthFetch(
        `${useApiConnector()}/clos`,
        {
          method: "POST",
          body: {
            code,
            subjectId,
            maxScore,
            name,
            eduProgramId
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
    async addPINamKhaoSat(cloId: number, requiredScore: number, maxScore: number, schoolYear: string) {
      const { data, error, pending } = await useAuthFetch(
        `${useApiConnector()}/clo-targets`,
        {
          method: "POST",
          body: {
            cloId,
            requiredScore,
            maxScore,
            schoolYear,
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
    async addPLoTarget(ploId: number, targetScore: number, schoolYear: string) {
      const { data, error, pending } = await useAuthFetch(
        `${useApiConnector()}/plo-targets`,
        {
          method: "POST",
          body: {
            ploId,
            targetScore,
            schoolYear,
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
    
    async addPITarget(piId: number, targetScore: number, schoolYear: string) {
      const { data, error, pending } = await useAuthFetch(
        `${useApiConnector()}/pi-targets`,
        {
          method: "POST",
          body: {
            piId,
            targetScore,
            schoolYear,
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
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMonHocVaChuanDauRaStore, import.meta.hot))
}
