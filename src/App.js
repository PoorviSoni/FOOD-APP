import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RestaurantRegister from "./components/RestaurantRegister";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginStatus } from "./store/userSlice";
import MasterLogin from "./components/MasterLogin";
import MasterAdminDashboard from "./components/MasterAdminDashboard";
import { restaurant } from "./store/restaurantSlice";
import { foodItemsfromDb } from "./store/foodSlice";
import Fooditems from "./components/Fooditems";
import { useState, useEffect } from "react";
import FoodDashboard from "./components/FoodDashboard";

function App() {
  // modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { isSuccess,userObj } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  // for display of restaurant and fooditems
  useEffect(() => {
    dispatch(restaurant());
    dispatch(foodItemsfromDb());
  }, []);

  //  logout operation
  const onUserLogout = () => {
    // removetoken from local storage
    localStorage.clear();
    dispatch(clearLoginStatus());
  };
  // styles to active links
  let activeLinkStyles = {
    color: "#C5D2DD",
    fontWidth: "bold",
  };
  return (
    <BrowserRouter>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="https://image.flaticon.com/icons/png/512/1532/1532688.png"
              alt=""
              width="25px"
            />{" "}
            FOOD APP!
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          {/* menu */}
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  mb-2 mb-lg-0 ms-auto">
              {!isSuccess ? (
                <>
                  <li class="nav-item">
                    <NavLink
                      activeStyle={activeLinkStyles}
                      className="nav-link"
                      to="/home"
                    >
                      <img
                        src="https://image.flaticon.com/icons/png/512/553/553416.png"
                        alt=""
                        width="25px"
                      />{" "}
                      Home
                    </NavLink>
                  </li>

                  <li class="nav-item">
                    <NavLink
                      activeStyle={activeLinkStyles}
                      className="nav-link"
                      to="/register"
                    >
                      <img
                        src="https://image.flaticon.com/icons/png/512/3596/3596004.png"
                        alt=""
                        width="25px"
                      />{" "}
                      Register
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      activeStyle={activeLinkStyles}
                      className="nav-link text-white"
                      to="/login"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2170/2170153.png"
                        width="25px"
                        alt=""
                      />
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <NavLink
                      activeStyle={activeLinkStyles}
                      className="nav-link"
                      to="/home"
                    >
                      <img
                        src="https://image.flaticon.com/icons/png/512/553/553416.png"
                        alt=""
                        width="25px"
                      />{" "}
                      Home
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      activeStyle={activeLinkStyles}
                      className="nav-link text-white"
                      to={`/userdashboard/${userObj.username}/fooddashboard`}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1037/1037762.png"
                        width="25px"
                        alt=""
                      />
                      UserDashBoard
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      activeStyle={activeLinkStyles}
                      className="nav-link text-white"
                      to="/home"
                      onClick={onUserLogout}
                    >
                      <img
                        src="https://image.flaticon.com/icons/png/512/1386/1386004.png"
                        alt=""
                        width="25px"
                      />{" "}
                      LogOut
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/restaurantregister">
          <RestaurantRegister />
        </Route>
        <Route path="/masterlogin">
          <MasterLogin />
        </Route>
        <Route path="/fooditems">
          <Fooditems />
        </Route>

        <Route path="/userdashboard/:username">
          <UserDashboard />
        </Route>
        <Route path="/admindashboard/:username">
          <AdminDashboard />
        </Route>
        <Route path="/masteradmindashboard">
          <MasterAdminDashboard />
        </Route>
        <Route path={`/userdashboard/${userObj.username}/fooddashboard`}>
          <FoodDashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
