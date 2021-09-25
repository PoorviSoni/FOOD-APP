const express = require("express");
//create express mini app
const userApiObj = express.Router();
//express async handler
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//import multerObj
const multerObj = require("../middlewares/addimage");
//parser
userApiObj.use(express.json());
//becryptjs
const bcryptjs = require("bcryptjs");
let usercollection;
// import usercollection instance
userApiObj.use((req, res, next) => {
  console.log("Hello at API user");
  usercollection = req.app.get("usercollection");
  next();
});

//add user
userApiObj.post(
  "/adduser",
  multerObj.single("photo"),
  expressAsyncHandler(async (req, res) => {
    //get product
    //userObj = req.body
    console.log("userApi", req.body);
    const userObj = JSON.parse(req.body.userData);
    //add image CDN link
    userObj.image = req.file.path;

    // check duplicate users
    const user = await usercollection.findOne({ username: userObj.username });
    //console.log('user',user)
    if (user !== null) {
      res.send({ message: "user existed" });
    } else {
      //save to usercollection
      let hashedPw = await bcryptjs.hash(userObj.password, 6);
      userObj.password = hashedPw;
      await usercollection.insertOne(userObj);
      //send res
      res.send({ message: "success", data: userObj });
    }
    //console.log('user APi userObj',userObj)
  })
);
// userlogin
userApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get user credentials
    let userDetailsObj = req.body;
    console.log(userDetailsObj);
    // find user by username
    let user = await usercollection.findOne({
      username: userDetailsObj.username,
    });
    console.log( "name",user);
    // if user is not there
    if (user === undefined) {
      res.send({ message: "invalid user" });
    } else {
      //  compare passwords
      let status = await bcryptjs.compare(
        userDetailsObj.password,
        user.password
      );
      // if not equal
      if (status === false) {
        res.send({ message: "invalid password" });
      }
      // if status is true
      else {
        let signedToken = await jwt.sign({ username: user.username }, "poorvi");
        res.send({ message: "success", token: signedToken, user: user });
      }
    }
  })
);
// restaurant details
userApiObj.post(
  "/getrestaurants",
  expressAsyncHandler(async (req, res) => {
    console.log("inside userApi getrestaurants");
    restaurantcollection = req.app.get("restaurantcollection");
    let response = await restaurantcollection
      .find({ status: "active" })
      .toArray();
    res.send({ message: "success", payload: response });
    console.log(response);
  })
);
// fooditems details
userApiObj.post(
  "/getfooditems",
  expressAsyncHandler(async (req, res) => {
    console.log("inside userApi getFood");
    foodcollection = req.app.get("foodcollection");
    let response = await foodcollection.find().toArray();
    res.send({ message: "success", payload: response });
    console.log(response);
  })
);

userApiObj.post(
  "/addtocart",
  
  expressAsyncHandler(async (req, res) => {
    cartcollection = req.app.get("cartcollection");
    let cartItem = await cartcollection.findOne({
      $and: [
        { fooditem: req.body.fooditem },
        { name: req.body.name},
        { username: req.body.username },
      ],
    });
    if (cartItem !== null) {
      let response = await cartcollection.updateOne(
        {
          $and: [
            { fooditem: req.body.fooditem },
            { name: req.body.name },
            { username: req.body.username },
          ],
        },
        { $set: { quantity: cartItem.quantity + 1 } }
      );
      res.send({ message: "success", payload: "Item is updated in the cart" });
    } else {
      let response = await cartcollection.insertOne(req.body);
      res.send({ message: "success" });
    }
    //console.log('req.body',req.body)
  })
);

userApiObj.post(
  "/getcartitems",
  
  expressAsyncHandler(async (req, res) => {
    cartcollection = req.app.get("cartcollection");
    //console.log('req.body',req.body)
    let response = await cartcollection
      .find({ username: req.body.username })
      .toArray();
    res.send({ message: "success", payload: response });
  })
);

userApiObj.post(
  "/updatecartitem",
  
  expressAsyncHandler(async (req, res) => {
    cartcollection = req.app.get("cartcollection");
    console.log("req.body update", req.body);
    await cartcollection.updateOne(
      {
        $and: [
          { fooditem: req.body.fooditem },
          { name: req.body.name },
          { username: req.body.username },
        ],
      },
      { $set: { quantity: req.body.quantity } }
    );
  })
);
userApiObj.post(
  "/deletecartitem",
 
  expressAsyncHandler(async (req, res) => {
    cartcollection = req.app.get("cartcollection");
    console.log("req.body update", req.body);
    await cartcollection.deleteOne({
      $and: [
        { fooditem: req.body.fooditem },
        { name: req.body.name },
        { username: req.body.username },
      ],
    });
  })
);

module.exports = userApiObj;
