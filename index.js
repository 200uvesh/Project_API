//--------------------------Import----------------------------------------------
require('dotenv').config()
const express = require("express")
 
const connectDB = require("./config/mongoDB.js")
connectDB()
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override")
const status = require("express-status-monitor")


 
 
 



//----------------------------Middlewares------------------------------------------------
app.use(status())  // for montoring Streams
app.use(methodOverride('_method'))
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser("secret"));
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")

 
 
 
//-----------------------------CREATING-ROUTES--------------------------------------------

//User Routes
const userRoute = require("./Routes/api/router.js")
app.use('/api' , userRoute)

//View Routes
const viewRoute = require("./Routes/views/router.js")
app.use('/' , viewRoute)




/*
  pehle ye tha maine ab maine  ise change krke button lgaya hai  
  app.use(methodOverride('X-HTTP-Method-Override'));




 -----------------------  For Frontend tech  -------------------

 MIDDLEWARES -: 
 const path = require("path")
 app.set('view engine' , 'ejs' )
 app.set("views", path.join(__dirname, "public"));

ROUTES -: 
 app.get('/register' , (req , res)=>{
     res.render('register')
 })

 app.get('/login' , (req , res)=>{
     res.render('login')

 })


*/
 


 //-----------------------------Listners--------------------------------------------------
const PORT = process.env.PORT || 6030
app.listen(PORT , ()=>{
     console.log(`Server is started at http://localhost:${PORT}`)
 })
 
