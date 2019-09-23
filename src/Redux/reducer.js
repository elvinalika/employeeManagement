import * as actionTypes from "./actionTypes";

let deleted = JSON.parse(localStorage.getItem("deleted"));
let length = deleted ? deleted.length : 0;

const initialState = {
  allEmployees: [],
  searchedEmployees: [],
  deletedEmployees: deleted,
  nrOfEmp: 0,
  nrOfDelEmp: length,
  totalPages: null,
  currentPage: 1,
  deleteButtonLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_EMPLOYEES_SUCCESS:
      let count = action.employees.length;
      let pages = Math.ceil(count / 10);
      let arrayOfPages = [];
      for (let i = 1; i < pages; i++) {
        arrayOfPages.push(i);
      }
      return {
        ...state,
        allEmployees: [...action.employees],
        nrOfEmp: count,
        totalPages: arrayOfPages
      };

    case actionTypes.CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page
      };

    case actionTypes.DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        deleteButtonLoading: true
      };
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
      let delEmp = state.deletedEmployees ? [...state.deletedEmployees] : [];
      delEmp.push(action.employeeName);
      let updatedEmp = [...state.allEmployees];
      updatedEmp = updatedEmp.filter(el => el.id !== action.id);
      return {
        ...state,
        allEmployees: updatedEmp,
        deletedEmployees: delEmp,
        nrOfDelEmp: delEmp.length,
        deleteButtonLoading: false
      };

    case actionTypes.ADD_EMPLOYEE_SUCCESS:
      let emps = state.allEmployees;
      emps.push(action.emp);
      return {
        ...state,
        allEmployees: emps
      };

    case actionTypes.EDIT_EMPLOYEE_SUCCESS:
      let updatedEmps = state.allEmployees;
      updatedEmps.forEach(el => {
        if (el.id === action.emp.id) {
          el = action.emp;
        }
        return el;
      });
      return {
        ...state,
        allEmployees: updatedEmps
      };
    default:
      return state;
  }
}
