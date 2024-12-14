import { acceptHMRUpdate, defineStore } from "pinia"
import { get } from "lodash"

export const useAdminStore = defineStore({
  id: "admin",
  persist: [],
  state: () => ({}),
  actions: {
    async fetchListSinhVien() {
      const {
        data: res,
        pending,
        refresh,
      } = await useAuthFetch(useApiConnector() + "/students")

      const data = computed(() => {
        if (res.value) {
          return get(res.value, "data.students", [])
        }

        return []
      })

      return { data, pending, refresh }
    },

    async addSinhVien(
      classRoom: string,
      firstName: string,
      lastName: string,
      id: string
    ) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/students",
        {
          method: "POST",
          body: {
            classRoom,
            firstName,
            lastName,
            id,
          },
        }
      )

      if (data.value) {
        useShowToast("Thêm thành công", "success")
      } else {
        useShowToast(get(error.value, "data.message", "Thêm thất bạn"), "error")
      }

      return { data, pending }
    },

    async editSinhVien(
      idSinhVien: string,
      firstName: string,
      lastName: string,
      classRoom: string
    ) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + `/students/${idSinhVien}`,
        {
          method: "PATCH",
          body: {
            firstName,
            lastName,
            classRoom,
          },
        }
      )

      if (data.value) {
        useShowToast("Sửa thành công", "success")
      } else {
        useShowToast(get(error.value, "data.message", "Sửa thất bạn"), "error")
      }

      return { data, pending }
    },

    async deleteSinhVien(id: string) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/students",
        {
          method: "DELETE",
          body: {
            studentIds: [id],
          },
        }
      )

      if (data.value) {
        useShowToast("Xóa thành công", "success")
      } else {
        useShowToast(get(error.value, "data.message", "Xóa thất bạn"), "error")
      }

      return { data, pending }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
