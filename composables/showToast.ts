import { ElNotification } from "element-plus"

export const useShowToast = (message?: string, type?: string = "info") => {
  ElNotification({
    title: "Thông báo",
    message: message || "Lỗi",
    type,
  })
}
