//------------------------------------Imports-------------------------------------- 
const {register , login ,  addPersonalDetail ,getUserDetails ,  updateUsername , updateEmail , updatePassword, deletUser , sendMail , logout} = require("../../controllers/api/controllers.js")
const express = require("express")
const checkAuth = require("../../middlewares/auth.js")
const router = express.Router()


router.get('/' , (req , res)=>{
    res.send("This is Home Page")
})
 

//ROUTES
router.post('/register'   ,   register )
router.post('/login' , login )
router.post('/addPersonalDetails' , checkAuth ,  addPersonalDetail)
router.get('/getUserDetails'  ,checkAuth , getUserDetails )  
router.put('/updateUsername' , checkAuth , updateUsername)
router.put('/updateEmail' , checkAuth , updateEmail)
router.put('/updatePassword' , checkAuth , updatePassword)
router.delete('/deleteUser' , checkAuth , deletUser)
router.get('/sendMail'  , checkAuth ,  sendMail)
router.post('/logout' , checkAuth , logout)



// router.get("/forget-password" , forgetPassword)
// router.put("/reset-password" , resetPassword)




 
module.exports = router
 










 