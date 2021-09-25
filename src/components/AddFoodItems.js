import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";

function AddFoodItems() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let {username}=useParams()
  let history =useHistory()
  const { userObj } = useSelector((state) => state.user);
  let [file, setFile] = useState(null);
  // for image select
  //after image selected
  const onFileSelect = (e) => {
    setFile(e.target.files[0]);
  };
  const onAddFoodItems = async (foodItems) => {
    foodItems.name = userObj.name;
    foodItems.status = "available";
    //create FOrmData obj
    let formData = new FormData();
    //append image to it
    formData.append("photo", file, file.name);
    //append productObj
    formData.append("userObj", JSON.stringify(foodItems));
    //HTTP POST
    let response = await axios.post("/admin/addfooditems", formData);
    let payload = response.data;
    // console.log("after product creation", response.data);
    // alert(response.data.message);
    if(response.data.message==="success"){
      history.push(`/admindashboard/${username}/viewfooditems`);
    }
  };
  return (
    <div>
      <form
        className="col-11 col-sm-8 col-md-6 mx-auto mt-3 shadow-lg user-register p-3 "
        onSubmit={handleSubmit(onAddFoodItems)}
      >
        {/* FoodItemname */}
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="fooditemname"
            {...register("fooditem", { required: true })}
            placeholder="Enter fooditemname"
          />
          <label for="fooditemname">Food Item Name</label>
        </div>
        {/* error */}
        {errors.fooditem?.type === "required" && (
          <p className="alert alert-danger">*Restaurentname is required</p>
        )}
        {/* food image */}
        <div class="form-floating mb-3">
          <input
            type="file"
            name="photo"
            className="form-control mb-3"
            id=""
            onChange={onFileSelect}
          />
        </div>
        {/* error */}
        {errors.file?.type === "required" && (
          <p className="alert alert-danger">*img is required</p>
        )}
        {/* category */}
        <select
          class="form-select form-select-lg mb-3"
          aria-label="Default select example"
          {...register("value", { required: true })}
        >
          <option selected>select menu</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-veg</option>
        </select>
        {errors.value?.type === "required" && (
          <p className="alert alert-danger">*Name is required</p>
        )}

        {/* price */}
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="number"
            {...register("foodprice", { required: true })}
            placeholder="Enter password"
          />
          <label for="number">Product Price</label>
        </div>
        {/* error */}
        {errors.foodprice?.type === "required" && (
          <p className="alert alert-danger">*Product Price is required</p>
        )}
        {/* description */}
        <div class="mb-3">
          <label for=" description" class="form-label">
            Food Description
          </label>
          <textarea
            class="form-control"
            {...register(" description", { required: true })}
            id=" description"
            rows="3"
          ></textarea>
        </div>
        {/* error */}
        {errors.description?.type === "required" && (
          <p className="alert alert-danger">*Enter Bussiness Justification</p>
        )}

        <button type="submit" class="btn btn-success float-end mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddFoodItems;
