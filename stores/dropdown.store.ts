import { acceptHMRUpdate, defineStore } from "pinia"
import { get } from "lodash"

export const useDropdownStore = defineStore({
  id: "dropdown",
  persist: [{}],
  state: () => ({}),
  getters: {},
  actions: {
    async fetchDropdownLop() {
      const {
        data: listClasses,
        pending,
        refresh,
      } = await useAuthFetch(useApiConnector() + "/classrooms")
      const data = computed(() => {
        if (listClasses.value) {
          return get(listClasses.value, "data.clasrooms", [])
        }

        return []
      })

      return { data, pending, refresh }
    },

    async addNewLop(id: string, schoolYear: string, programId: number) {
      const { data, pending } = await useAuthFetch(
        useApiConnector() + "/classrooms",
        {
          method: "POST",
          body: {
            id,
            schoolYear,
            programId,
            name: id,
          },
        }
      )

      return { data, pending }
    },

    async fetchDropdownChuongTrinhDaoTao() {
      const { data: res, pending } = await useAuthFetch(
        useApiConnector() + "/education-programs"
      )

      const data = computed(() => {
        if (res.value) {
          return get(res.value, "data.educationPrograms", [])
        }

        return []
      })

      return { data, pending }
    },

    //
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDropdownStore, import.meta.hot))
}
