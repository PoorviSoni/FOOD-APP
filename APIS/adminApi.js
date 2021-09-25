const express = require("express");
const adminApiObj = express.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multerObj = require("../middlewares/addimage");


// body parser middleware

adminApiObj.use(express.json());

// let adminCollection;
// get admincollection obj

adminApiObj.use((req, res, next) => {
  admincollection = req.app.get("admincollection");
  next();
});

adminApiObj.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get admin credentials
    let adminCredentialObj = req.body;
    console.log(adminCredentialObj);
    // find user by username
    let user = await admincollection.findOne({username: adminCredentialObj.username});
    console.log(user);
    // if admin is not there
    if (user ===null) {
      res.send({ message: "invalid user" });
    } else {
      //  compare passwords

      let status = await bcryptjs.compare(
        adminCredentialObj.password,
        user.password
      );
      if (status === false) {
        res.send({ message: "invalid password" });
      }
      // if status is true
      else {
        let signedToken = await jwt.sign(
          { username: user.username },
          "poorvi",
          { expiresIn: 1000 }
        );
        res.send({ message: "success", token: signedToken, user: user });
      }
    }
  })
);
//adding food items
adminApiObj.post(
  "/addfooditems", multerObj.single("photo"),
  expressAsyncHandler(async (req, res) => {
    foodcollection = req.app.get("foodcollection");
    const foodItem = JSON.parse(req.body.userObj);
    foodItem.image = req.file.path;
    console.log("foodItem", foodItem);
    let restName = foodItem.name;
    const foodName = await foodcollection.findOne({
      $and: [{ name: restName }, { fooditem: foodItem.fooditem }],
    });
    if (foodName === null) {
      await foodcollection.insertOne(foodItem);
      res.send({ message: "success" });
    } else {
      res.send({ message: "item already exists" });
    }
  })
);
//view food items
adminApiObj.post(
  "/viewfoodItems",
  expressAsyncHandler(async (req, res) => {
    foodcollection = req.app.get("foodcollection");
    let userObj = req.body;

    console.log(userObj);
    const foodItems = await foodcollection
      .find({ name: req.body.name })
      .toArray();
    res.send({ message: "success", payload: foodItems });

    
  })
);

// edit product
adminApiObj.post(
  "/editFoodItem",
  expressAsyncHandler(async (req, res) => {
    foodcollection = req.app.get("foodcollection");
    await foodcollection.updateOne(
      { $and: [{ name: req.body.name }, { fooditem: req.body.fooditem }] },
      { $set: { status: req.body.status } }
    );
    res.send({ message: "availability changed" });
  })
);

// delete product
adminApiObj.post("/deleteFoodItem",expressAsyncHandler(async (req, res) => {
    // console.log("master Api");
      foodcollection = req.app.get("foodcollection");
      console.log("rest",req.body);
      await foodcollection.deleteOne({fooditem:req.body.fooditem})
      res.send({ message: "product is deleted"});
      // console.log("payload",products)
    })
  );
module.exports = adminApiObj;
