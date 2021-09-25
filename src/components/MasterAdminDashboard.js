import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function MasterAdminDashBoard() {
  let [carts, setCarts] = useState([]);
  let updateStatus = [];
  let [activeRes, setActiveRes] = useState([]);
  let [blockedRes, setBlockedRes] = useState([]);
  let dispatch = useDispatch();

  //    geting data from cart collection
  let bRes = [],
    aRes = [];

  useEffect(async () => {
    console.log("start");
    let response = await axios.post("/masteradmin/viewrestaurent");
    let allProducts = response.data;

    if (allProducts.message === "success") {
      setCarts([...allProducts.payload]);
    } else {
      alert(allProducts.message);
    }
    await allProducts.payload.map((restaurant) => {
      if (restaurant.status === "blocked") {
        bRes.push(restaurant);
      }
      if (restaurant.status === "active") {
        aRes.push(restaurant);
      }
    });
    setBlockedRes([...bRes]);
    setActiveRes([...aRes]);
  }, []);

  const onActiveStatus = async (index) => {
    let restaurant = blockedRes[index];
    let adminObj = {};
    console.log("active func", restaurant);
    adminObj.username = restaurant.username;
    adminObj.password = restaurant.password;
    adminObj.name = restaurant.name;

    restaurant.status = "active";
    let response = await axios.post("/masteradmin/addrestaurent", adminObj);
    console.log("response addadmin", response.data.message);
    if (response.data.message === "success") {
      blockedRes.splice(index, 1);
      activeRes.push(restaurant);
      setBlockedRes([...blockedRes]);
      setActiveRes([...activeRes]);
    }
    let resResponse = await axios.post("masteradmin/updateRescoll", restaurant);
    // console.log('active func', restaurant);
    // console.log('active adminObj', adminObj);
  };

  const onBlockedStatus = async (index) => {
    let restaurant = activeRes[index];
    let adminObj = {};
    console.log("active func", restaurant);
    adminObj.username = restaurant.username;

    restaurant.status = "blocked";
    let response = await axios.post("/masteradmin/deleterestaurant", adminObj);
    console.log("response addadmin", response.data.message);
    if (response.data.message === "success") {
      activeRes.splice(index, 1);
      blockedRes.push(restaurant);
      setBlockedRes([...blockedRes]);
      setActiveRes([...activeRes]);
    }
    let resResponse = await axios.post("masteradmin/updateRescoll", restaurant);
  };

  return (
    <div>
      <div className="container">
        <h1>ACTIVE RESTAURANTS</h1>
        {activeRes.length ? (
          <div className="row mt-5">
            {activeRes.map((cart, index) => {
              return (
                <div className="col-sm-6 col-md-4  mt-5" key={index}>
                  <div className="card shadow ">
                    <img src={cart.profile_pic} alt="" height="100%" />
                    <div className="card-body" key={index}>
                      <h1>{cart.name}</h1>
                      <h1>{cart.username}</h1>
                      <h3>{cart.ownername}</h3>
                      <h3>{cart.contactnumber}</h3>
                      <p>{cart.email}</p>
                      <p>{cart.discreption}</p>

                      <button
                        type="button"
                        class="btn btn-outline-secondary ms-3"
                        onClick={() => onBlockedStatus(index)}
                      >
                        <img
                          src="https://image.flaticon.com/icons/png/512/2920/2920039.png"
                          alt=""
                          width="25px"
                        />{" "}
                        Block
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h4>No Active Restaurent</h4>
        )}
        <h1>BLOCKED RESTAURANT</h1>
        {blockedRes.length ? (
          <div className="row mt-5">
            {blockedRes.map((cart, index) => {
              return (
                <div className="col-sm-6 col-md-4  mt-5" key={index}>
                  <div className="card shadow ">
                    <img src={cart.profile_pic} alt="" height="100%" />
                    <div className="card-body" key={index}>
                      <h1>{cart.name}</h1>
                      <h1>{cart.username}</h1>
                      <h3>{cart.ownername}</h3>
                      <h3>{cart.contactnumber}</h3>
                      <p>{cart.email}</p>
                      <p>{cart.discreption}</p>

                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        onClick={() => onActiveStatus(index)}
                      >
                        <img
                          src="https://image.flaticon.com/icons/png/512/2919/2919931.png"
                          alt=""
                          width="25px"
                        />{" "}
                        Active
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h4>No Blocked Restaurent</h4>
        )}
      </div>
    </div>
  );
}

export default MasterAdminDashBoard;
