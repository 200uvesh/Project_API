//------------------------------------Imports-------------------------------------- 
const {register , login ,  addPersonalDetail ,getUserDetails ,  updateUsername , updateEmail , updatePassword, deletUser ,   logout , forgotPassword , resetPassword , resetPasswordNext} = require("../../controllers/api/controllers.js")
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
router.post('/logout' , checkAuth , logout)
router.post('/forgot-password' , forgotPassword)
router.get('/reset-password' , resetPassword)
router.post('/reset-password-next' , resetPasswordNext )





 
module.exports = router
 










 