
import React from "react";
import {BrowserRouter, NavLink,Route,Switch,useRouteMatch,useParams} from "react-router-dom";
import AddFoodItems from "./AddFoodItems";
import ViewFoodItems from "./ViewFoodItems";

function AdminDashboard() {
  // getting url params
  let { username } = useParams();
  // set path and url by using use routermatch
  let { path, url } = useRouteMatch();
  let linkStyles = {
    color: "white",
    backgroundColor: "#1475bb",
    fontWeight: "bold",
  };

return (
  <div>
    {/* routers for product and carts */}
    <BrowserRouter>
      <ul className="nav nav-pills justify-content-evenly mt-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeStyle={linkStyles}
            to={`${url}/addfooditems`}
          >
            AddFoodItems
          </NavLink>
        </li>
        <li className="nav-item position-relative">
          <NavLink
            className="nav-link"
            activeStyle={linkStyles}
            to={`${url}/viewfooditems`}
          >
            ViewFoodItems
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path={`${path}/`}>
          <AddFoodItems />
        </Route>

        <Route path={`${path}/addfooditems`}>
          <AddFoodItems />
        </Route>
        <Route path={`${path}/viewfooditems`}>
          <ViewFoodItems />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
      }

export default AdminDashboard
