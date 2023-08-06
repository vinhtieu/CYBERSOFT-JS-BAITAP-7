export default class Employee {
  constructor(
    account,
    name,
    email,
    password,
    ngayLam,
    salary,
    position,
    gioLam
  ) {
    (this.account = account),
      (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.ngayLam = ngayLam),
      (this.salary = salary),
      (this.position = position),
      (this.gioLam = gioLam),
      (this.tongLuong = this.tinhLuong()),
      (this.xepLoai = this.xepLoai());
  }

  tinhLuong() {
    switch (this.position) {
      case "Sếp":
        return (this.salary * 3);
      case "Trưởng phòng":
        return this.salary * 2;
      case "Nhân viên":
        return this.salary;
    }
  }

  xepLoai() {
    if (this.gioLam >= 192) {
      return "Xuất Sắc";
    } else if (this.gioLam >= 176) {
      return "Giỏi";
    } else if (this.gioLam >= 160) {
      return "Khá";
    } else {
      return "Trung Bình";
    }
  }
}
