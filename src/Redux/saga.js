import { put, takeLatest, call } from "redux-saga/effects";
import {
  getEmployeesSuccess,
  getEmployeesFail,
  deleteEmployeeSuccess,
  deleteEmployeeFail,
  addEmployeeSuccess,
  addEmployeeFail,
  editEmployeeSuccess,
  editEmployeeFail
} from "./actions";
import * as actionTypes from "./actionTypes";
import axios from "axios";

export function* fetchEmployees() {
  try {
    const response = yield fetch(
      "http://dummy.restapiexample.com/api/v1/employees"
    ).then(res => res.json());
    yield put(getEmployeesSuccess(response));
  } catch (err) {
    yield put(getEmployeesFail(err));
  }
}

export function* deleteEmployees(action) {
  try {
    yield fetch(
      "http://dummy.restapiexample.com/api/v1/delete/" + action.el.id,
      {
        method: "DELETE"
      }
    ).then(res => res);
    yield put(deleteEmployeeSuccess(action.el.employee_name, action.el.id));
  } catch (err) {
    yield put(deleteEmployeeFail(err));
  }
}

export function* addEmployee(action) {
  console.log(action.emp);
  try {
    const emp = {
      name: action.emp.employee_name,
      salary: action.emp.employee_salary,
      age: action.emp.employee_age
    };
    const response = yield call(
      axios.post,
      "http://dummy.restapiexample.com/api/v1/create",
      JSON.stringify(emp)
    );
    const newEmp = {
      id: response.data.id,
      employee_name: response.data.name,
      employee_salary: response.data.salary,
      employee_age: response.data.age
    };
    yield put(addEmployeeSuccess(newEmp));
  } catch (err) {
    yield put(addEmployeeFail(err));
  }
}

export function* editEmployee(action) {
  try {
    const emp = {
      name: action.emp.employee_name,
      salary: action.emp.employee_salary,
      age: action.emp.employee_age
    };
    const response = yield call(
      axios.put,
      "http://dummy.restapiexample.com/api/v1/update/" + action.emp.id,
      JSON.stringify(emp)
    );
    const newEmp = {
      id: action.emp.id,
      employee_name: response.data.name,
      employee_salary: response.data.salary,
      employee_age: response.data.age
    };
    yield put(editEmployeeSuccess(newEmp));
  } catch (err) {
    yield put(editEmployeeFail(err));
  }
}

export default function* saga() {
  yield takeLatest(actionTypes.GET_EMPLOYEES_REQUEST, fetchEmployees);
  yield takeLatest(actionTypes.DELETE_EMPLOYEE_REQUEST, deleteEmployees);
  yield takeLatest(actionTypes.ADD_EMPLOYEE_REQUEST, addEmployee);
  yield takeLatest(actionTypes.EDIT_EMPLOYEE_REQUEST, editEmployee);
}
