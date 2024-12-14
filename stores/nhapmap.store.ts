import { acceptHMRUpdate, defineStore } from "pinia"
import _ from "lodash"

export const useNhapMapStore = defineStore({
  id: "NhapMapStore",
  state: () => ({}),
  getters: {},
  actions: {
    async fetchMaTranDeThi(eduProgramId: number | string, schoolYear: string) {
      const {
        data: res,
        error,
        pending,
      } = await useAuthFetch(`${useApiConnector()}/pis`, {
        params: {
          eduProgramId,
          schoolYear,
        },
      })

      const data = computed(() => {
        if (!_.isEmpty(res.value)) {
          return _.get(res.value, "data")
        }

        return []
      })

      return { data, pending, error }
    },
    async fetchListMonHoc(eduProgramId: number | string, schoolYear: string) {
      const {
        data: res,
        error,
        pending,
      } = await useAuthFetch(`${useApiConnector()}/subjects`, {
        params: {
          eduProgramId,
          schoolYear,
        },
      })

      const data = computed(() => {
        if (!_.isEmpty(res.value)) {
          return _.get(res.value, "data")
        }

        return []
      })

      return { data, pending, error }
    },
    async fetchMappingTable(
      schoolyear: string,
      subjectId: string | number,
      eduProgramId: string
    ) {
      if (_.isNull(subjectId)) return

      const {
        data: res,
        error,
        pending,
      } = await useAuthFetch(`${useApiConnector()}/import-maps`, {
        params: {
          schoolyear,
          subjectId,
          eduProgramId,
        },
      })

      const data = computed(() => {
        if (!_.isEmpty(res.value)) {
          return _.get(res.value, "data")
        }

        return []
      })

      console.log(data)

      return { data, error, pending }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNhapMapStore, import.meta.hot))
}
