import * as actionTypes from "./actionTypes";

export const getEmployeesRequest = () => ({
  type: actionTypes.GET_EMPLOYEES_REQUEST
});

export const getEmployeesSuccess = employees => ({
  type: actionTypes.GET_EMPLOYEES_SUCCESS,
  employees
});

export const getEmployeesFail = error => ({
  type: actionTypes.GET_EMPLOYEES_FAIL,
  error
});

export const changeCurrentPage = page => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  page
});

export const deleteEmployeeRequest = el => ({
  type: actionTypes.DELETE_EMPLOYEE_REQUEST,
  el
});

export const deleteEmployeeSuccess = (employeeName, id) => ({
  type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
  employeeName,
  id
});

export const deleteEmployeeFail = error => ({
  type: actionTypes.DELETE_EMPLOYEE_FAIL,
  error
});

export const addEmployeeRequest = emp => ({
  type: actionTypes.ADD_EMPLOYEE_REQUEST,
  emp
});

export const addEmployeeSuccess = emp => ({
  type: actionTypes.ADD_EMPLOYEE_SUCCESS,
  emp
});

export const addEmployeeFail = error => ({
  type: actionTypes.ADD_EMPLOYEE_FAIL,
  error
});

export const editEmployeeRequest = emp => ({
  type: actionTypes.EDIT_EMPLOYEE_REQUEST,
  emp
});

export const editEmployeeSuccess = emp => ({
  type: actionTypes.EDIT_EMPLOYEE_SUCCESS,
  emp
});

export const editEmployeeFail = error => ({
  type: actionTypes.EDIT_EMPLOYEE_FAIL,
  error
});
