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

    async fetchListMonHoc() {
      const {
        data: res,
        pending,
        refresh,
      } = await useAuthFetch(useApiConnector() + "/subjects")

      const data = computed(() => {
        if (res.value) {
          return get(res.value, "data.subjects", [])
        }

        return []
      })

      return { data, pending, refresh }
    },

    async addMonHoc(
      code: string,
      name: string,
      soTiet: number,
      soTinChi: number
    ) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/subjects",
        {
          method: "POST",
          body: {
            code,
            name,
            soTiet,
            soTinChi,
            eduProgramIds: [],
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

    async deleteMonHoc(subjectIds: any) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/subjects",
        {
          method: "DELETE",
          body: {
            subjectIds: [subjectIds],
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

    async editMonHoc(
      subjectId: string,
      code: string,
      name: string,
      soTiet: number,
      soTinChi: number
    ) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + `/subjects/${subjectId}`,
        {
          method: "PATCH",
          body: {
            code,
            name,
            soTiet,
            soTinChi,
            eduProgramIds: [], //chương trình đào tạo
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

    async addMultipleCTDTToMonHoc(idSubject: string, listCTDT: []) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + `/subjects/${idSubject}`,
        {
          method: "PATCH",
          body: {
            eduProgramIds: listCTDT,
          },
        }
      )

      if (data.value) {
        useShowToast("Lưu thành công", "success")
      } else {
        useShowToast(get(error.value, "data.message", "Lưu thất bạn"), "error")
      }

      return { data, pending }
    },

    async fetchChuongTrinhDaoTaoById(educationProgramsId: number) {
      const { data: res, pending } = await useAuthFetch(
        useApiConnector() + `/subjects?eduProgramId=${educationProgramsId}`
      )

      const data = computed(() => {
        if (res.value) {
          return get(res.value, "data.subjects", [])
        }

        return []
      })

      return { data, pending }
    },

    async addNewKhoa(code: string, name: string, description: string) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/faculties",
        {
          method: "POST",
          body: {
            code,
            name,
            description,
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

    async editKhoa(
      facultyID: string,
      code: string,
      name: string,
      description: string
    ) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + `/faculties/${facultyID}`,
        {
          method: "PATCH",
          body: {
            code,
            name,
            description,
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

    async deleteKhoa(facultyIds: string) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/faculties",
        {
          method: "DELETE",
          body: {
            facultyIds: [facultyIds],
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

    async addNganh(code: string, name: string, facultyId: number) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/programs",
        {
          method: "POST",
          body: {
            code,
            name,
            facultyId,
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

    async editNganh(
      programId: string,
      code: string,
      name: string,
      facultyID: number
    ) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + `/programs/${programId}`,
        {
          method: "PATCH",
          body: {
            code,
            name,
            facultyID,
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

    async deleteNganh(programsIds: number) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/programs",
        {
          method: "DELETE",
          body: {
            programIds: [programsIds],
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

    async addCTDT(programId: string, code: string, name: string) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/education-programs",
        {
          method: "POST",
          body: {
            code,
            name,
            programId,
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

    async editCTDT(
      educationProgramsId: string,
      code: string,
      name: string,
      facultyID: number
    ) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + `/programs/${educationProgramsId}`,
        {
          method: "PATCH",
          body: {
            code,
            name,
            facultyID,
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

    async deleteCTDT(programsIds: number) {
      const { data, pending, error } = await useAuthFetch(
        useApiConnector() + "/programs",
        {
          method: "DELETE",
          body: {
            programIds: [programsIds],
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

    //
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
