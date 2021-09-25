import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin } from "../store/userSlice";

function MasterLogin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   let { userObj, isSuccess, isError, isLoading, invalidLoginMessage } =
  //     useSelector((state) => state.user);
  // let dispatch = useDispatch();
  let history = useHistory();

  // let [MasterAdminCredentialsObj, setMasterAdminCredentialsObj] = useState({
  //   type: "",
  //   username: "",
  //   password: "",
  // });

  const onMasterAdminLogin = async (masterObj) => {
    let response = await axios.post("/masteradmin/login", masterObj);

    let payload = response.data;
    console.log("after product creation", response.data);
    alert(response.data.message);

    if (payload.message === "success") {
      // redirect to login
      history.push("/masteradmindashboard");
    }
    // else {
    //  alert(response.data.message);
    // }
  };

  return (
    <div className="row mt-5 focus-in-contract">
      <h2 className="focus-in-contracts text-center ">MASTER LOGIN</h2>

      <form
        className="col-11 col-sm-8 col-md-6 mx-auto user-register p-3 shadow-lg"
        onSubmit={handleSubmit(onMasterAdminLogin)}
      >
        {/* name */}
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="username"
            {...register("username", { required: true })}
            placeholder="Enter Name"
          />
          <label for="username">Username</label>
        </div>
        {/* error */}
        {errors.username?.type === "required" && (
          <p className="alert alert-danger">*Name is required</p>
        )}

        {/* username */}
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            {...register("password", { required: true })}
            placeholder="Enter UserName"
          />
          <label for="password">Password</label>
        </div>
        {/* error */}
        {errors.password?.type === "required" && (
          <p className="alert alert-danger">*Password required</p>
        )}
        <button type="submit" class="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
export default MasterLogin;
