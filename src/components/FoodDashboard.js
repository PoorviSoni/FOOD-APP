import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory,useParams } from "react-router-dom";
import { setCartOfStore } from "../store/cartSlice";
import AxiosRequestWithToken from "../AuthorizedTokens/AxiosRequestWithToken";

function FoodDashboard() {
  let { restaurants } = useSelector((state) => state.restaurant);
  let { foodItems } = useSelector((state) => state.foodItem);
  let { userObj } = useSelector((state) => state.user);
  let { cartItems } = useSelector((state) => state.cart);
  console.log("restaurants", restaurants);
  console.log("foodItems", foodItems);

  let { username } = useParams();
  let dispatch = useDispatch();
  let history = useHistory();
  let cFoodItems = JSON.parse(JSON.stringify(foodItems));
  let cCartItems = JSON.parse(JSON.stringify(cartItems));
  console.log("cCartItems", cCartItems);
  console.log("restaurants", restaurants);
  console.log("foodItems", foodItems);

  async function addtoCart(ind) {
    let axiosToken = await AxiosRequestWithToken();
    let foodItem = cFoodItems[ind];
    foodItem.username = userObj.username;
    foodItem.quantity = 1;
    let response = await axiosToken.post("/users/addtocart", foodItem);
    let count = 0;
    if (response.data.message === "success") {
      await cCartItems.map((cartItem, index) => {
        if (
          cartItem.username === foodItem.username &&
          cartItem.name === foodItem.name &&
          cartItem.fooditem === foodItem.fooditem
        ) {
          cartItem.quantity = cartItem.quantity + 1;
          cCartItems.splice(index, 1, cartItem);
          console.log("oldupdate Item", cCartItems);
          dispatch(setCartOfStore(cCartItems));
          count = 1;
          history.push(`/userdashboard/${username}/usercart`);
        }
      });
      if (count === 0) {
        cCartItems.push(foodItem);
        console.log("new ", cCartItems);
        dispatch(setCartOfStore(cCartItems));
        history.push(`/userdashboard/${username}/usercart`);
      }
    }
  }

  return (
    <div className="container">
      {
        //restaurants.filter((restaurant)=>(restaurant.status==='active')).map(())
        restaurants.map((restaurant, index) => {
          return restaurant.status === "active" ? (
            <>
              <h2 className="text-center text-warning mt-5 mb-2 border border-danger">
                {restaurant.name}
              </h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                {foodItems.map((foodItem, index) => {
                  return (
                    foodItem.name === restaurant.name && (
                      <div className="col">
                        <div class="card box" key={index}>
                          <img
                            src={foodItem.image}
                            class="card-img-top"
                            alt="..."
                            width="120rem"
                            height="220rem"
                          />
                          <div class="card-body">
                            <h3 class="card-title">{foodItem.fooditem}</h3>
                            <h5>Price : {foodItem.foodprice} ₹</h5>

                            <p class="card-text">{foodItem.description}</p>
                            <button
                              className="btn btn-primary float-end"
                              onClick={() => addtoCart(index)}
                            >
                              <img src="https://cdn-icons-png.flaticon.com/512/2438/2438136.png" alt="" width="25px"/>
                              
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </>
          ) : (
            console.log("this is false")
          );
        })
      }
    </div>
  );
}

export default FoodDashboard;
