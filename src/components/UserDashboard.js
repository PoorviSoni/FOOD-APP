import React from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import FoodDashboard from "./FoodDashboard";
import UserCart from "./UserCart";
import { useSelector,useDispatch } from "react-redux";
import { cartItemsfromDb } from "../store/cartSlice";
import Fooditems from "./Fooditems";
import {useEffect} from "react"


function UserDashboard() {
   let { searchFood } = useSelector((state) => state.searchFood);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartItemsfromDb(userObj));
  }, []);
  let { userObj } = useSelector((state) => state.user);
  let {cartItems} = useSelector ((state) => state.cart);
  // getting url params
  let { username } = useParams();
  // set path and url by using use routermatch
  let { path, url } = useRouteMatch();
  let linkStyles = {
    color: "white",
    backgroundColor: "#C5D2DD",
    fontWeight: "bold",
  };

  return (
    <div className="container-fluid">
      <div className="d-block p-auto justify-content-end">
        {/* userprofile */}
        <h3 className="text-end d-inline">
          Welcome <span className="text-primary pr-2">{username}</span>
        </h3>
        <img
          src={userObj.image}
          alt=""
          className="rounded-circle"
          width="70px"
        />
      </div>

      {/* routers for fooddashboard and carts */}
      <BrowserRouter>
        <ul className="nav nav-pills justify-content-evenly mt-3">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeStyle={linkStyles}
              to={`${url}/fooddashboard`}
            >
              Food Dashboard
            </NavLink>
          </li>
          <li className="nav-item position-relative">
            <NavLink
              className="nav-link"
              activeStyle={linkStyles}
              to={`${url}/usercart`}
            >
              <img
                src="https://img-premium.flaticon.com/png/512/2273/premium/2273100.png?token=exp=1632397023~hmac=9834ba824c1912a927a859f43658d84e"
                alt=""
                width="25px"
              />
              UserCart
              <sup>{cartItems.length}</sup>
            </NavLink>
          </li>
        </ul>
        <Switch>
          {searchFood.length !== 0 ? (
            <Route exact path={`${path}`}>
              <Fooditems />
            </Route>
          ) : (
            <Route exact path={`${path}`}>
              <FoodDashboard />
            </Route>
          )}
          <Route path={`${path}/fooddashboard`}>
            <FoodDashboard />
          </Route>
          <Route path={`${path}/usercart`}>
            <UserCart />
          </Route>
          <Route path={`/userdashboard/${userObj.username}/fooddashboard`}>
            <FoodDashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default UserDashboard;
