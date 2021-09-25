
const exp = require('express')
const app = exp();
const path = require('path')
require('dotenv').config();

//connecting to build
app.use(exp.static(path.join(__dirname,'./build')))

//import APIs
const userApiObj = require('./APIS/userApi')
const adminApiObj = require('./APIS/adminApi')
const restaurantApiObj = require('./APIS/restaurantApi')
const masteradminApiObj = require("./APIS/masteradminApi");

//dealing with unknown url paths during refresh
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

//transfer to api
app.use('/users',userApiObj);
app.use('/admin',adminApiObj);
app.use('/restaurant',restaurantApiObj);
app.use("/masteradmin", masteradminApiObj);

//import mongoclient
let mongoclient = require('mongodb').MongoClient
const dbURL = process.env.DATABASE_URL

//connect to db
mongoclient.connect(dbURL,(err,client)=>{
    if(err){
        console.log('error occured while connecting to db',err.message)
    }
    else{
        // create db instance
       let dbObj = client.db('foodApp')
       //create collection instance
       let usercollection = dbObj.collection('usercollection')
       let admincollection = dbObj.collection('admincollection')
       let restaurantcollection = dbObj.collection('restaurantcollection')
       let masteradmincollection = dbObj.collection("masteradmincollection");
       let foodcollection = dbObj.collection("foodcollection");
        let cartcollection = dbObj.collection("cartcollection");




       //set collections to apis
       app.set('usercollection',usercollection)
       app.set('admincollection',admincollection)
       app.set('restaurantcollection',restaurantcollection)
        app.set("masteradmincollection", masteradmincollection);
         app.set("foodcollection", foodcollection);
         app.set("cartcollection",cartcollection)
       console.log('connected to DB')
    }
})

app.use((err,req,res,next)=>{console.log('global error occured',err)})


PORT = process.env.PORT
app.listen(PORT, console.log(`server at ${PORT}`))