import Home from "../containers/Home";
import AllEmployees from "../containers/AllEmployees";
import DeletedEmployees from "../containers/DeletedEmployees";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/allEmployees",
    component: AllEmployees
  },
  {
    path: "/deletedEmployees",
    component: DeletedEmployees
  }
];

export default routes;
