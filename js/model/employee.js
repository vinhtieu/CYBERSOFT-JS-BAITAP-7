export default class Employee {
  constructor(
    account,
    name,
    email,
    password,
    ngayLam,
    salary,
    position,
    gioLam,
    tongTien,
    xepLoai
  ) {
    (this.account = account),
      (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.ngayLam = ngayLam),
      (this.salary = salary),
      (this.position = position),
      (this.gioLam = gioLam),
      (this.tongTien = tongTien),
      (this.xepLoai = xepLoai);
  }
}
