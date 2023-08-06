import Employee from "../model/employee.js";

// *----- Variables -----*

const alert = document.querySelector(".alert");
const searchBar = document.querySelector("#searchName");

const addEmployee = document.querySelector("#btnThemNV");
const updateEmployee = document.querySelector("#btnCapNhat");
const closeFormBtn = document.querySelector("#btnDong");
const openFormBtn = document.querySelector("#btnThem");
const table = document.querySelector("#tableDanhSach");

let employeeList = [];
let editIndex; // tracking the edited employee

// *----- EventListeners -----*

document.addEventListener("DOMContentLoaded", start);

searchBar.addEventListener("input", (e) => {
  handleSearchEmployee(e.target.value);
});

openFormBtn.addEventListener("click", () => {
  hideAllAlerts();
  clearInputFields();
  addEmployee.disabled = false;
  updateEmployee.disabled = true;
});

addEmployee.addEventListener("click", handleCreateEmployee);
updateEmployee.addEventListener("click", () => {
  handleUpdateEmployee(editIndex);
});

// *----- Helper Functions -----*

// Function for validating user inputs

function isInputsValid(
  account,
  name,
  email,
  password,
  ngayLam,
  salary,
  position,
  gioLam
) {
  let accountValidationResult = isAccountValid(account);
  let nameValidationResult = isNameValid(name);
  let emailValidationResult = isEmailValid(email);
  let passwordValidationResult = isPasswordValid(password);
  let dateValidationResult = isNgayValid(ngayLam);
  let salaryValidationResult = isSalaryValid(salary);
  let positionValidationResult = isPositionValid(position);
  let gioLamValidationResult = isGioLamValid(gioLam);

  return (
    accountValidationResult &&
    nameValidationResult &&
    emailValidationResult &&
    passwordValidationResult &&
    dateValidationResult &&
    salaryValidationResult &&
    positionValidationResult &&
    gioLamValidationResult
  );
}

function isAccountValid(account) {
  let isValid = true;
  let alertMessage = ``;
  let between4And6Chars = /^.{4,6}$/;

  if (account === "") {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> This field is required</span>`;
    isValid = false;
  } else if (!between4And6Chars.test(account)) {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> Account should be between 4 and 6 characters</span>`;
    isValid = false;
  }

  showInputAlert("tbTKNV", alertMessage);
  return isValid;
}

function isNameValid(name) {
  let isValid = true;
  let alertMessage = ``;
  let alphabeticCharsRegex = /^[A-Za-z\s\-éÉ]/;
  let moreThan2CharRegex = /^.{2,}$/;

  // Check empty name
  if (name === "") {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> This field is required</span>`;
    isValid = false;
  }
  // Check alphabetic chars in name
  else if (!alphabeticCharsRegex.test(name)) {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> Name shouldn't have digits</span>`;
    isValid = false;
  }
  // Check number of char in name
  else if (!moreThan2CharRegex.test(name)) {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> Name should be at least 2 characters</span>`;
    isValid = false;
  }

  showInputAlert("tbTen", alertMessage);
  return isValid;
}

function isEmailValid(email) {
  let isValid = true;
  let alertMessage = ``;
  let emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email === "") {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> This field is required</span>`;
    isValid = false;
  } else if (!emailPattern.test(email)) {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> Invalid email</span>`;
    isValid = false;
  }

  showInputAlert("tbEmail", alertMessage);
  return isValid;
}

function isPasswordValid(password) {
  const containLowerCaseLetters = /^(?=.*[a-z])/;
  const containUpperCaseLetters = /^(?=.*[A-Z])/;
  const containDigits = /^(?=.*[0-9])/;
  const containSpecialChar = /^(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/;
  const contain8Chars = /^.{6,10}$/;

  const checks = [
    {
      regex: contain8Chars,
      message: "At least 8 characters",
    },
    {
      regex: containLowerCaseLetters,
      message: "Lower case letters (a-z)",
    },
    {
      regex: containUpperCaseLetters,
      message: "Upper case letters (a-z)",
    },
    {
      regex: containDigits,
      message: "Numbers (0-9)",
    },
    {
      regex: containSpecialChar,
      message: "Special characters (ex: !@#$%^&*()_+)",
    },
  ];

  let isValid = true;
  let result = ``;

  checks.forEach((check) => {
    let validation = check.regex.test(password);
    let icon = validation ? "check" : "times";
    let status = validation ? "success" : "error";
    result += `<span class="${status}"><i class="fa fa-${icon}" aria-hidden="true"> ${check.message}</i> </span>`;

    if (!validation) isValid = false;
  });

  // Render alert
  showInputAlert("tbMatKhau", result);
  return isValid;
}

function isNgayValid(ngay) {
  console.log("🚀 ~ file: index.js:179 ~ isNgayValid ~ ngay:", ngay);
  console.log("🚀 ~ file: index.js:179 ~ isNgayValid ~ ngay:", typeof ngay);
  let isValid = true;
  let alertMessage = ``;
  let ngayPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

  if (ngay === "") {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> This field is required</span>`;
    isValid = false;
  } else if (!ngayPattern.test(ngay)) {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> Invalid date (format: mm/dd/yyyy)</span>`;
    isValid = false;
  }

  showInputAlert("tbNgay", alertMessage);
  return isValid;
}

function isPositionValid(position) {
  let isValid = true;
  let alertMessage = ``;

  if (position === "Chọn chức vụ") {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> This field is required</span>`;
    isValid = false;
  }

  showInputAlert("tbChucVu", alertMessage);
  return isValid;
}

function isSalaryValid(salary) {
  let isValid = true;
  let alertMessage = ``;
  let condition = salary * 1 >= 1000000 && salary * 1 <= 20000000;

  if (salary === "") {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> This field is required</span>`;
    isValid = false;
  } else if (!condition) {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> Invalid salary (1tr <= VND <= 20tr)</span>`;
    isValid = false;
  }

  showInputAlert("tbLuongCB", alertMessage);
  return isValid;
}

function isGioLamValid(hour) {
  let isValid = true;
  let alertMessage = ``;
  let condition = hour * 1 <= 200;

  if (hour === "") {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> This field is required</span>`;
    isValid = false;
  } else if (!condition) {
    alertMessage = `<span><i class="fa fa-times" aria-hidden="true"></i> The hour should be smaller then 200 hours</span>`;
    isValid = false;
  }

  showInputAlert("tbGiolam", alertMessage);
  return isValid;
}

//Functions for inputs' alerts

function showInputAlert(id, message) {
  const alert = document.querySelector(`#${id}`);
  alert.style.display = `block`;
  alert.innerHTML = `${message}`;
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
  document.querySelector(".modal form").reset();
}

// CRUD

function handleCreateEmployee() {
  let [account, name, email, password, ngayLam, salary, position, gioLam] =
    getUserInputs();

  // Validation
  if (
    isInputsValid(
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
    let employee = new Employee(
      account,
      name,
      email,
      password,
      ngayLam,
      salary,
      position,
      gioLam
    );

    employeeList.push(employee);
    renderTable(employeeList);
    closeFormBtn.click();
    alert.style.display = " none";
    saveStorage(employeeList);
  }
  // Add new employee
}

function handleSearchEmployee(input) {
  let length = employeeList.length;
  let result = [];
  let keyValue;
  let searchValue;

  if (input === "") {
    renderTable(employeeList);
  } else {
    for (let i = 0; i < length; i++) {
      keyValue = employeeList[i].xepLoai.toLowerCase();
      searchValue = input.toLowerCase();
      if (keyValue.includes(searchValue)) {
        result.push(employeeList[i]);
      }
    }

    renderTable(result);
  }
}

function handleUpdateEmployee(index) {
  let [account, name, email, password, ngayLam, salary, position, gioLam] =
    getUserInputs();

  let employeeObject = new Employee(
    account,
    name,
    email,
    password,
    ngayLam,
    salary,
    position,
    gioLam
  );

  employeeList[index] = employeeObject;

  renderTable(employeeList);
  closeFormBtn.click();
  saveStorage(employeeList);
}

function handleDeleteEmployee(employeeIndex, rowId) {
  employeeList.splice(employeeIndex, 1);
  document.querySelector(`.table #${rowId}`).remove();
  alert.style.display = " none";
  saveStorage(employeeList);
}

// Functions for Storage

function saveStorage(list) {
  localStorage.setItem("danhSachNV", JSON.stringify(list));
}

function loadStorage() {
  return localStorage.getItem("danhSachNV");
}

// Other functions

function editEmployee(employeeIndex) {
  openFormBtn.click();
  addEmployee.disabled = true;
  updateEmployee.disabled = false;

  setInputFields(
    employeeList[employeeIndex].account,
    employeeList[employeeIndex].name,
    employeeList[employeeIndex].email,
    employeeList[employeeIndex].password,
    employeeList[employeeIndex].ngayLam,
    employeeList[employeeIndex].salary,
    employeeList[employeeIndex].position,
    employeeList[employeeIndex].gioLam
  );

  editIndex = employeeIndex;
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
        <td>${array[i].tongLuong}</td>
        <td>${array[i].xepLoai}</td>
        <td>
          <div><i class="fa fa-minus-circle" aria-hidden="true" id="deleteBtn" onclick="handleDeleteEmployee('${i}','row${
        i + 1
      }')"></i></div>
        </td>
        <td>
          <div><i class="fa fa-pencil" aria-hidden="true" id="editBtn" onclick="editEmployee('${i}')"></i></div>
        </td>

       </tr>
      `;
    }
  } else {
    throw new Error("Param is not an array");
  }

  // Add table to website
  document.querySelector("#tableDanhSach").innerHTML = htmlsTable;
}

// Initialization function

function start() {
  window.handleDeleteEmployee = handleDeleteEmployee;
  window.editEmployee = editEmployee;

  let jsonList = loadStorage();

  if (jsonList === "") {
    alert.style.display = " flex";
  } else if (jsonList === null) {
    alert.style.display = " flex";
    saveStorage("");
  } else {
    alert.style.display = " none";
    employeeList = JSON.parse(jsonList);
    renderTable(employeeList);
  }
}
