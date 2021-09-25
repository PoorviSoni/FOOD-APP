// create a route
const express = require("express");
const masteradminApiObj = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// body parsar middleware
masteradminApiObj.use(express.json());

let masteradmincollection;

// get usercollection Obj
// masteradminApiObj.use((req, res, next) => {
//   masteradminCollection = req.app.get("masteradminCollection");
//   next();
// });

// user login
masteradminApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    masteradmincollection = req.app.get("masteradmincollection");
    // gret usercredtial Obj
    let masteradminCredentialsObj = req.body;
    console.log("master", masteradminCredentialsObj);
    // find the user by username
    let user = await masteradmincollection.findOne({
      username: masteradminCredentialsObj.username,
    });
    // if username not there
    if (user === undefined) {
      res.send({ message: "invalid username" });
    }
    // if username existed check password
    else {
      // compare password
      let status = masteradminCredentialsObj.password === user.password;
      // if not equal
      if (status === false) {
        res.send({ message: "Invalid Password" });
      }
      // if status is true
      else {
        // create and send token
        let signedToken = await jwt.sign(
          { username: user.username },
          process.env.SECRET,
          { expiresIn: 1000 }
        );
        // send token in res
        res.send({ message: "success", token: signedToken, user: user });
      }
    }
  })
);

// get products database
masteradminApiObj.post("/viewrestaurent",expressAsyncHandler(async (req, res) => {
  console.log("master Api");
    restaurantcollection = req.app.get("restaurantcollection");
    let products = await restaurantcollection.find().toArray();
    res.send({ message: "success", payload: products });
    console.log("payload",products)
  })
);
// get products database
masteradminApiObj.post("/addrestaurent",expressAsyncHandler(async (req, res) => {
  console.log("master Api");
    admincollection = req.app.get("admincollection");
    // console.log("rest",req.body);
    await admincollection.insertOne(req.body)
    res.send({ message: "success"});
    // console.log("payload",products)
  })
);

// get products database
masteradminApiObj.post("/updateRescoll",expressAsyncHandler(async (req, res) => {
  console.log("master Api");
    restaurantcollection = req.app.get("restaurantcollection");
    let restaurant = req.body;
    await restaurantcollection.updateOne({username:restaurant.username},{$set:{status:restaurant.status}})
  })
);

masteradminApiObj.post("/deleterestaurant",expressAsyncHandler(async (req, res) => {
  console.log("master Api");
    admincollection = req.app.get("admincollection");
    // console.log("rest",req.body);
    await admincollection.deleteOne({username:req.body.username})
    res.send({ message: "success"});
    // console.log("payload",products)
  })
);




// export module
module.exports = masteradminApiObj;
