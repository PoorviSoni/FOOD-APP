import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ViewFoodItems() {
  let [foodItem, setfoodItems] = useState([]);
  let { userObj } = useSelector((state) => state.user);

  useEffect(async () => {
    console.log("start");
    let response = await axios.post("/admin/viewfoodItems", userObj);
    console.log("response", response);
    let allProducts = response.data.payload;
    setfoodItems([...allProducts]);
  }, []);

  // edit operation
  const editProduct = async (index) => {
    let restObj = foodItem[index];
    if (restObj.status === "available") {
      restObj.status = "unavailable";
    } else {
      restObj.status = "available";
    }
    let response = await axios.post("/admin/editFoodItem", restObj);
    if (response.data.message === "availability changed") {
      foodItem.splice(index, 1, restObj);
      setfoodItems([...foodItem]);
    }
  };

  // delete operation
  const deleteProduct = async (index) => {
    let restObj = foodItem[index];
    let response = await axios.post("/admin/deleteFoodItem", restObj);
    let deleteProducts = response.data;
    if (deleteProducts.message === "product is deleted") {
      foodItem.splice(index, 1);
      setfoodItems([...foodItem]);
      // alert("product deleted")
    }
  };
  console.log(foodItem);
  
  return (
    <div>
      <div className="row mt-5">
        {foodItem.map((cart, index) => {
          return (
            <div className="col-sm-6 col-md-4  mt-5" key={index}>
              <div className="card shadow ">
                <img src={cart.image} alt="" height="220rem" width="100%" />
                <div className="card-body" key={index}>
                  <h1>{cart.fooditem}</h1>
                  <h1>{cart.foodprice}₹</h1>
                  <h3>{cart.value}</h3>
                  {cart.status === "available" ? (
                    <h3 className=" text-success">{cart.status}</h3>
                  ) : (
                    <h3 className="text-danger">{cart.status}</h3>
                  )}
                  <p>{cart.discription}</p>

                  <button
                    type="button"
                    class="btn btn-outline-secondary ms-3"
                    onClick={() => editProduct(index)}
                  >
                    <img
                      src="https://image.flaticon.com/icons/png/512/1160/1160515.png"
                      alt=""
                      width="25px"
                    />{" "}
                    Availability
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-secondary ms-3"
                    onClick={() => deleteProduct(index)}
                  >
                    <img
                      src="https://image.flaticon.com/icons/png/512/3221/3221897.png"
                      alt=""
                      width="25px"
                    />{" "}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewFoodItems;
