import Employee from "../model/employee.js";

// *----- Variables -----*

const alert = document.querySelector(".alert");
const searchBar = document.querySelector("#searchName");

const addEmployee = document.querySelector("#btnThemNV");
const updateEmployee = document.querySelector("#btnCapNhat");
const closeFormBtn = document.querySelector("#btnDong");
const openFormBtn = document.querySelector("#btnThem");
const table = document.querySelector("#tableDanhSach");

let employeeList;
let editIndex; // tracking the edited employee

// *----- EventListeners -----*

document.addEventListener("DOMContentLoaded", start);

searchBar.addEventListener("input", (e) => {
  handleSearchEmployee(e.target.value);
});

openFormBtn.addEventListener("click", () => {
  hideAllAlerts();
  clearInputFields();
});

addEmployee.addEventListener("click", handleCreateEmployee);
updateEmployee.addEventListener("click", handleUpdateEmployee);

table.addEventListener("click", (e) => {
  let clickedRow = e.target.closest("tr");
  let rowId = clickedRow.id;
  let accountName = document.querySelectorAll(`#${rowId} td`)[0].innerText;

  // if (clickedRow) {
  //   if (e.target.matches("#deleteBtn")) {
  //Xóa sinh viên
  //     handleDeleteEmployee(accountName, rowId, employeeList);
  //   } else if (e.target.matches("#editBtn")) {
  //Sửa sinh viên

  //     editEmployee(accountName);
  //   }
  // }
});

// *----- Helper Functions -----*

// Function for validating user inputs

function isInputsEmpty(
  account,
  name,
  email,
  password,
  ngayLam,
  salary,
  position,
  gioLam
) {
  return (
    account === "" ||
    name === "" ||
    email === "" ||
    password === "" ||
    ngayLam === "" ||
    salary === "" ||
    position === "" ||
    gioLam === ""
  );
}

function isInputsValid(account, name, email, password, salary, gioLam) {
  return (
    isAccountValid(account) &&
    isNameValid(name) &&
    isEmailValid(email) &&
    isPasswordValid(password) &&
    isSalaryValid(salary) &&
    isGioLamValid(gioLam)
  );
}

function isAccountValid(account) {
  let length = account.length;
  return length >= 4 && length <= 6;
}

function isNameValid(name) {
  let namePattern = /^[A-Za-z\s\-éÉ]{2,}$/;
  return namePattern.test(name);
}

function isEmailValid(email) {
  let emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailPattern.test(email);
}

function isPasswordValid(password) {
  let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]).{6,10}$/;
  return passwordPattern.test(password);
}

function isSalaryValid(salary) {
  return salary * 1 >= 1000000 && salary * 1 <= 20000000;
}

function isGioLamValid(hour) {
  return hour * 1 <= 200 && hour !== "";
}

//Functions for inputs' alerts

function showInputAlert(id, message) {
  const alert = document.querySelector(`#${id}`);
  alert.style.display = `block`;
  alert.innerText = `${message}`;
}

function hideAllAlerts() {
  const alertAccount = document.querySelector(`#tbTKNV`);
  const alertName = document.querySelector(`#tbTen`);
  const alertEmail = document.querySelector(`#tbEmail`);
  const alertPassword = document.querySelector(`#tbMatKhau`);
  const alertDate = document.querySelector(`#tbNgay`);
  const alertSalary = document.querySelector(`#tbLuongCB`);
  const alertPosition = document.querySelector(`#tbChucVu`);
  const alertHour = document.querySelector(`#tbGiolam`);

  alertAccount.style.display = `none`;
  alertName.style.display = `none`;
  alertEmail.style.display = `none`;
  alertPassword.style.display = `none`;
  alertDate.style.display = `none`;
  alertSalary.style.display = `none`;
  alertPosition.style.display = `none`;
  alertHour.style.display = `none`;
}

//Functions for input fields

function getUserInputs() {
  const account = document.querySelector("#tknv").value;
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const ngayLam = document.querySelector("#datepicker").value;
  const salary = document.querySelector("#luongCB").value;
  const position = document.querySelector("#chucvu").value;
  const gioLam = document.querySelector("#gioLam").value;

  return [account, name, email, password, ngayLam, salary, position, gioLam];
}

function setInputFields(
  account,
  name,
  email,
  password,
  ngayLam,
  salary,
  position,
  gioLam
) {
  document.querySelector("#tknv").value = account;
  document.querySelector("#name").value = name;
  document.querySelector("#email").value = email;
  document.querySelector("#password").value = password;
  document.querySelector("#datepicker").value = ngayLam;
  document.querySelector("#luongCB").value = salary;
  document.querySelector("#chucvu").value = position;
  document.querySelector("#gioLam").value = gioLam;
}

function clearInputFields() {
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "Chọn chức vụ";
  document.querySelector("#gioLam").value = "";
}

// Functions for handling inputs' errors

function handleEmptyInputs(
  account,
  name,
  email,
  password,
  ngayLam,
  salary,
  position,
  gioLam
) {
  if (account === "") {
    showInputAlert("tbTKNV", "This field is required");
  }
  if (name === "") {
    showInputAlert("tbTen", "This field is required");
  }
  if (email === "") {
    showInputAlert("tbEmail", "This field is required");
  }
  if (password === "") {
    showInputAlert("tbMatKhau", "This field is required");
  }
  if (ngayLam === "") {
    showInputAlert("tbNgay", "This field is required");
  }
  if (salary === "") {
    showInputAlert("tbLuongCB", "This field is required");
  }
  if (position === "Chọn chức vụ") {
    showInputAlert("tbChucVu", "This field is required");
  }
  if (gioLam === "") {
    showInputAlert("tbGiolam", "This field is required");
  }
}

function handleInvalidInputs(account, name, email, password, salary, gioLam) {
  if (isAccountValid(account) == false) {
    showInputAlert("tbTKNV", "Invalid Account");
  }
  if (isNameValid(name) == false) {
    showInputAlert("tbTen", "Invalid Name");
  }
  if (isEmailValid(email) == false) {
    showInputAlert("tbEmail", "Invalid Email");
  }
  if (isPasswordValid(password) == false) {
    showInputAlert("tbMatKhau", "Invalid Password");
  }
  if (isSalaryValid(salary) == false) {
    showInputAlert("tbLuongCB", "Invalid Salary");
  }
  if (isGioLamValid(gioLam) == false) {
    showInputAlert("tbGiolam", "Invalid Gio Lam");
  }
}

// Other functions

function editEmployee(accountName) {
  openFormBtn.click();

  let length = employeeList.length;
  for (let i = 0; i < length; i++) {
    if (employeeList[i].account == accountName) {
      setInputFields(
        employeeList[i].account,
        employeeList[i].name,
        employeeList[i].email,
        employeeList[i].password,
        employeeList[i].ngayLam,
        employeeList[i].salary,
        employeeList[i].position,
        employeeList[i].gioLam
      );
      editIndex = i;
      break;
    }
  }
}

function renderTable(array) {
  let htmlsTable = ``;

  if (Array.isArray(array)) {
    let length = array.length;
    // Render data to html table
    for (let i = 0; i < length; i++) {
      htmlsTable += `
       <tr id="row${i + 1}">
        <td>${array[i].account}</td>
        <td>${array[i].name}</td>
        <td>${array[i].email}</td>
        <td>${array[i].ngayLam}</td>
        <td>${array[i].position}</td>
        <td>${array[i].tongTien}</td>
        <td>${array[i].xepLoai}</td>
        <td>
          <div><i class="fa fa-minus-circle" aria-hidden="true" id="deleteBtn" onclick="deleteElement('${i}')"></i></div>
        </td>
        <td>
          <div><i class="fa fa-pencil" aria-hidden="true" id="editBtn"></i></div>
        </td>

       </tr>
      `;
    }
  } else {
    throw new Error("Param is not an array");
  }

  // Add table to website
  document.querySelector("#tableDanhSach").innerHTML = htmlsTable;

  //
}

function calSalary(position, salary) {
  switch (position) {
    case "Sếp":
      return salary * 3;
    case "Trưởng phòng":
      return salary * 2;
    case "Nhân viên":
      return salary;
  }
}

function rateEmployee(hour) {
  if (hour >= 192) {
    return "Xuat Sac";
  } else if (hour >= 176) {
    return "Gioi";
  } else if (hour >= 160) {
    return "Kha";
  } else {
    return "Trung Binh";
  }
}

// CRUD

function handleCreateEmployee() {
  let [account, name, email, password, ngayLam, salary, position, gioLam] =
    getUserInputs();

  // Check for empty inputs
  if (
    isInputsEmpty(
      account,
      name,
      email,
      password,
      ngayLam,
      salary,
      position,
      gioLam
    )
  ) {
    handleEmptyInputs(
      account,
      name,
      email,
      password,
      ngayLam,
      salary,
      position,
      gioLam
    );
  }
  // Validation
  else if (
    isInputsValid(account, name, email, password, salary, gioLam) == false
  ) {
    handleInvalidInputs(account, name, email, password, salary, gioLam);
  }
  // Add new employee
  else {
    let tongTien = calSalary(position, salary);
    let xepLoai = rateEmployee(gioLam);

    let employee = new Employee(
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
    );

    employeeList.push(employee);
    renderTable(employeeList);
    closeFormBtn.click();
    alert.style.display = " none";
    localStorage.setItem("danhSachNV", JSON.stringify(employeeList));
  }
}

function handleUpdateEmployee() {
  let [account, name, email, password, ngayLam, salary, position, gioLam] =
    getUserInputs();

  let tongTien = calSalary(position, salary);
  let xepLoai = rateEmployee(gioLam);

  (employeeList[editIndex].account = account),
    (employeeList[editIndex].name = name),
    (employeeList[editIndex].email = email),
    (employeeList[editIndex].password = password),
    (employeeList[editIndex].ngayLam = ngayLam),
    (employeeList[editIndex].salary = salary),
    (employeeList[editIndex].position = position),
    (employeeList[editIndex].gioLam = gioLam);
  (employeeList[editIndex].tongTien = tongTien),
    (employeeList[editIndex].xepLoai = xepLoai);

  renderTable(employeeList);
  closeFormBtn.click();
  localStorage.setItem("danhSachNV", JSON.stringify(employeeList));
}

function handleDeleteEmployee(accountName, rowId, list) {
  const selectedRow = document.querySelector(`#${rowId}`);
  const limit = list.length;

  for (let i = 0; i < limit; i++) {
    if (list[i].account === accountName) {
      list.splice(i, 1);
      break;
    }
  }

  selectedRow.remove();
  alert.style.display = " none";
  localStorage.setItem("danhSachNV", JSON.stringify(list));
}

// Xóa sinh vien
function deleteElement(id) {
  console.log(`delete id:${id}`);
}

// Function for searching

function handleSearchEmployee(input) {
  let length = employeeList.length;
  let arrayObject = [];

  if (input === "") {
    renderTable(employeeList);
  } else {
    for (let i = 0; i < length; i++) {
      let keyValue = employeeList[i].xepLoai.toLowerCase();
      let searchValue = input.toLowerCase();
      if (keyValue.includes(searchValue)) {
        arrayObject.push(employeeList[i]);
      }
    }

    renderTable(arrayObject);
  }
}

// Initialization function

function start() {
  let jsonList = localStorage.getItem("danhSachNV");

  if (jsonList === "") {
    alert.style.display = " flex";
  } else if (jsonList === null) {
    alert.style.display = " flex";
    localStorage.setItem("danhSachNV", "");
  } else {
    alert.style.display = " none";
    employeeList = JSON.parse(jsonList);
    renderTable(employeeList);
  }
}
