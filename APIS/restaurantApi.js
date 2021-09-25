// mini express app
const express = require("express")
// mini express app is new istance of routerObject
const restaurantApiObj= express.Router()
// express handler for deal with error ent back end
const expressAsyncHandler = require("express-async-handler")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multerObj = require("../middlewares/addimage")


// body parsar middleWare 
restaurantApiObj.use(express.json())

let restaurantcollection;
// get usercollectionObject
restaurantApiObj.use((req,res,next)=>{
    restaurantcollection=req.app.get("restaurantcollection")
    next()
})

// user registration
restaurantApiObj.post("/adduser",multerObj.single("photo"),expressAsyncHandler(async (req,res)=>{

    // get user from  req.body
    let newUser = JSON.parse(req.body.userObj)
    newUser.profile_pic=req.file.path;
    //  console.log("new user",newUser)
    console.log("new user",newUser)
    // check for duplicate user
    let user = await  restaurantcollection.findOne({username:newUser.username})
    // if user existed,sen res as "userexisted"
    if(user !== null){
        res.send({message:"user existed"})
    }
    // else hash password
    else{
        // hash the password
            let hashPassword = await bcryptjs.hash(newUser.password,6)
    
        // replace the plainpassword with hashpassword
             newUser.password = hashPassword;
         // save to usercollection
    
          await  restaurantcollection.insertOne(newUser)
          res.send({message:"success"})
    }
    
}))


// export userApiObj
module.exports = restaurantApiObj