const expres = require("express")
const router = expres.Router()

const {homePage , register , login , addPersonalDetails  , userPage  , updateDetails  , deleteUser , logout , updateUsername ,updateEmail , updatePassword , getDetails  , getUserDetails , forgotPassword , resetPassword } = require("../../controllers/views/controller")

//HomePages
router.get('/' , getDetails)
router.get('/homePage' , homePage)
router.get('/userPage' , userPage)

//Auth
router.get('/register' , register)
router.get('/login' , login)
router.get('/logout' , logout)

//CRUD-operations
router.get('/addPersonalDetails' , addPersonalDetails)
router.get('/getUserDetails' , getUserDetails)
router.get('/updateDetails' , updateDetails)
router.get('/updateUsername' , updateUsername)
router.get('/updateEmail' , updateEmail)
router.get('/updatePassword' , updatePassword)
router.get('/deleteUser' , deleteUser )
router.get('/forgot-password' , forgotPassword)
router.get('/reset-password' , resetPassword)


 

module.exports = router
