import { ElNotification } from "element-plus"
import _ from "lodash"

export const useShowToast = useDebounce(
  (message?: string, type: string = "info") => {
    ElNotification({
      title: "Thông báo",
      message: message || "Lỗi",
      type,
    })
  },
  500
)
