export interface MenuItem {
  index: number
  name: string
  params: string
  component: string
}

export const menu: MenuItem[] = [
  {
    index: 1,
    name: "PLO và PI",
    params: "plo-va-pi",
    component: "PLOVaPI",
  },
  {
    index: 2,
    name: "Môn học và CLO",
    params: "mon-hoc-va-clo",
    component: "MonHocVaCLO",
  },
  {
    index: 3,
    name: "Nhập map",
    params: "nhap-map",
    component: "NhapMap",
  },
  {
    index: 4,
    name: "Đề cương chi tiết",
    params: "de-cuong-chi-tiet",
    component: "DeCuongChiTiet",
  },
  {
    index: 5,
    name: "Admin",
    params: "admin",
    component: "Admin",
  },
  {
    index: 6,
    name: "Xem kết quả đánh giá môn học",
    params: "ket-qua-danh-gia-mon-hoc",
    component: "KetQuaDanhGiaMonHoc",
  },
  {
    index: 7,
    name: "Kết quả đánh giá chương trình đào tạo",
    params: "ket-qua-danh-gia-chuong-trinh-dao-tao",
    component: "KetQuaDanhGiaChuongTrinhDaoTao",
  },
  {
    index: 8,
    name: "Tổng hợp theo CTDT",
    params: "bao-cao-tong-hop-ctdt",
    component: "BaoCaoTongHopCTDT",
  },
  {
    index: 9,
    name: "Chấm điểm",
    params: "cham-diem",
    component: "ChamDiem",
  },
]
