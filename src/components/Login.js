import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearLoginStatus, userLogin } from "../store/userSlice";
import { useHistory } from "react-router-dom";

function Login() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch(clearLoginStatus);
  let { isSuccess, userObj, isLoading, isError, invalidLogin } = useSelector(
    (state) => state.user
  );
  let [userDetailsObj, setUserDetailsObj] = useState({
    type: "",
    username: "",
    password: "",
  });
  let history = useHistory();

  function formSubmitInLogin(userDetails) {
    console.log(userDetails);
    setUserDetailsObj({ ...userDetails });
    dispatch(userLogin(userDetails));
  }

  useEffect(() => {
    if (isSuccess && userDetailsObj.type === "User") {
      history.push(`/userdashboard/${userObj.username}`);
    }
    if (isSuccess && userDetailsObj.type === "Admin") {
      history.push(`/admindashboard/${userObj.username}`);
    }
  }, [isSuccess, userDetailsObj]);
  return (
    <div className="  focus-in-contract gradient-custom-3">
      {invalidLogin && (
        <h5 className="text-danger text-center">{invalidLogin}</h5>
      )}

      
      <h2 className=" text-center focus-in-contracts">LOGIN</h2>
      <form
        className="col-11 col-sm-8 col-md-6 mx-auto shadow-lg user-register p-3"
        onSubmit={handleSubmit(formSubmitInLogin)}
      >
        {/* radio button */}
        <div>
          <input
            type="radio"
            name="radio"
            value="Admin"
            id="Admin"
            {...register("type")}
          />
          <label htmlFor="Admin" className="me-5">
            Restaurant User
          </label>
          <input
            type="radio"
            name="radio"
            value="User"
            id="User"
            {...register("type")}
          />
          <label htmlFor="User">Users</label>
        </div>
        {/* username field */}
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="username"
            {...register("username", { required: true, minLength: 4 })}
          />
          <label for="username">Username</label>
        </div>
        {errors.username?.type === "required" && (
          <p className="alert alert-danger">Userame is Required</p>
        )}

        {/* password field */}
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          <label for="password">Password</label>
        </div>
        {errors.password?.type === "required" && (
          <p className="alert alert-danger">*Enter Password</p>
        )}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3596/3596079.png"
          alt=""
          width="25px"
        />

        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}

export default Login;
