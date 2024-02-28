// imports
require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") 
const RegisterUser = require("../../DataModels/registration.model.js")
const LoginUser = require("../../DataModels/login.model.js")
const updateDetails = require("../../DataModels/updateDetails.model.js")
const addPersonalDetails = require("../../DataModels/personalDetail.model.js")
 
const randomString = require("randomstring")
const UpdateDetails = require("../../DataModels/updateDetails.model.js")
const {sendResetPasswordMail}= require("../../utils/sendMail.js")

 

//REGISTER API
exports.register=  async(req , res)=>{
    data = new RegisterUser({
      username:req.body.username,
      email:req.body.email,
      password: bcrypt.hashSync(req.body.password)
      
    })
         try{
            const already_exist=  await RegisterUser.findOne({email:data.email}) || await RegisterUser.findOne({username:data.username})
            if(!already_exist){
                 
                await data.save()
                 
               
                const payload = {
                    username : data.username  , 
                    email: data.email, 
                    password: data.password
                  }
                
                  jwt.sign(payload , process.env.JWT_SECRET_KEY , (error , token)=>{
                      if(error){
                         
                          throw error
                      }
                       
                        res.cookie( "jwtToken" , token ,
                        { httpOnly: true, 
                            secure: false, 
                            expires:new Date(Date.now()+25892000000)
                        })
                    //   console.log("Cookies Set Sucessfully")
                    //   console.log(token)
                    //   res.send("Register Sucess !! ")
                      res.redirect("/addPersonalDetails")

                      
                                                  
                  } )

                   
                   
            }
            else{
                res.status(200).send("Email is already registered")
                // console.log("Email is alreday registered")
            }
         }
    catch(err){

        // console.log("Something went wrong")
        res.send("Something went wrong")
    }
}  







//LOGIN API
exports.login= async (req , res)=>{
    const data = new LoginUser(
        {
            email: req.body.email,
            password: req.body.password
        }
     )
     try{
    
     const values = await RegisterUser.findOne({email:data.email})
   
       if(values){
        // console.log(values)
         
    //    const hashPassword =  values.password
    //    console.log(values.password)
    //    console.log(data.password)
       const isMatch =  await  bcrypt.compare (data.password , values.password  )
    //    console.log(isMatch)

     
       //bcrypt.compare(req.body.password,RegisterUser.password)
      
          if(isMatch){
            const payload = {
                username : data.username  , 
                email: data.email, 
                 password: data.password
              }
            
              jwt.sign(payload , process.env.JWT_SECRET_KEY , (error , token)=>{
                  if(error){
                     
                      throw error
                  }
                  else{
                    res.cookie( "jwtToken" , token ,
                    { httpOnly: true, 
                        secure: false, 
                        expires:new Date(Date.now()+25892000000)
                    })
                //   console.log("Cookies Set Sucessfully")

                  }
            })
             
            // console.log("Login Sucess")
             await data.save()
            //  console.log("Login Detail Save Sucess")
          
             //  res.status(200).send("Login Sucess !!")
            res.redirect("/userPage") 
        }
        else{
            res.status(200).send("Email or Password is Incorrect")
            // console.log("Email or Password is Incorrect")    
        }
    }
    else{
        res.status(500).send("Email or Password is Incorresct")
        // console.log("Email or Password is Incorresct")
    }    
}
catch(error){
    // console.log("Something went wrong" + error)
    res.status(400).send("Something Went Wrong")
}
}







//ADD DETAILS API
exports.addPersonalDetail=async(req , res)=>{
    try{
        const data = new addPersonalDetails(
            {
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                age:req.body.age , 
                 
            }
        )

       await data.save()
     //    console.log("Personal Details saved sucessfull !!")
       res.redirect("/userPage")
        // res.status(200).send("Personal Details saved sucessfull !!")
         

    }
    catch(error){
        // console.log("Error is Occured : " +error )
        res.status(500).send(error)

    } 
 }






//GET DETAILS API

exports.getUserDetails = async(req , res)=>{
    // const data = new updateDetails(
    //     {
    //         email:req.body.email
    //     }
    // )
    try{
        const dataPersonal =  await addPersonalDetails.findOne()
        const dataRegister = await RegisterUser.findOne()
        res.status(201).json(

            {
    
                firstName : dataPersonal.firstName,
                lastName :dataPersonal.lastName , 
                dateOfBirth : dataPersonal.dateOfBirth , 
                age:dataPersonal.age , 
                username: dataRegister.username , 
                email : dataRegister.email
            }
    
        )

    }
    catch(error){
        // console.log("Error " + error)
        res.status(504).send(error)

    }
}







//UPDATE-username API
exports.updateUsername= async(req , res)=>{
     
    try{
        const data = new updateDetails(
            {
                oldUsername:req.body.oldUsername  , 
                newUsername:req.body.newUsername
            }
        )

       const isCheck = await RegisterUser.findOne({username:data.oldUsername})
       if(!isCheck){
        //   console.log("Old Username is not correct ! ! ")
          res.status(200).send("Old Username is not correct ! ! ")
       }
       else{
        await RegisterUser.updateOne({username:data.oldUsername} , {$set:{username:data.newUsername}})
        // await data.save()
        // console.log("Username  Updated sucessfully !!!")
        res.status(201).send("Username  Updated sucessfully !!!")

       }
         
    }
    catch(error){
        // console.log("Something Went Wrong Error is :  " + error)
         res.status(500).send("Something Went Wrong")

    }
}





//UPDATE-email API
exports.updateEmail=async(req , res)=>{

    
    try{
        const data = new updateDetails(
            {
                oldEmail:req.body.oldEmail  , 
                newEmail:req.body.newEmail
            }
        )

       const isCheck = await RegisterUser.findOne({email:data.oldEmail})
       if(!isCheck){
        //   console.log("Email is not correct ! ! ")
          res.status(200).send("Email is not correct ! ! ")
       }
         await RegisterUser.updateOne({email:data.oldEmail} , {$set:{email:data.newEmail}})
        //  await data.save()
        //  console.log("Email   Updated sucessfully !!!")
         res.status(201).send("Email   Updated sucessfully !!!")
    }
    catch(error){
        // console.log("Something Went Wrong Error is :  " + error)
        res.status(500).send("Something Went Wrong ")

    }

}





//UPDATE-password API
exports.updatePassword=async(req , res)=>{

    
    try{
      
        const data = new updateDetails(
            {
                _id : req.body._id , 
                oldPassword:req.body.oldPassword  , 
                newPassword:req.body.newPassword
            }
        )
         

       const prevData = await RegisterUser.findOne({_id:data._id})
        
       
       const isCheck = await bcrypt.compare(data.oldPassword,prevData.password ) 
        console.log(isCheck)

       if(!isCheck){
        //   console.log("Password is not correct ! ! ")
          res.status(200).send("Password is notcorrect ! ! ")
       }
       else{
        await RegisterUser.updateOne({_id:data._id} , {$set:{password: bcrypt.hashSync(data.newPassword)}})
        //  console.log("Password  Updated sucessfully !!!")
         res.status(201).send("Password  Updated sucessfully !!!")

       }
          
    }
    catch(error){
        // console.log("Something Went Wrong Error is :  " + error)
        res.status(500).send(error)

    }


}





//DELETE-user API
exports.deletUser = async(req , res)=>{
  
    try{
        const data = new updateDetails(
            {
                firstName: req.body.firstName,
                email:req.body.email  , 
                password:req.body.password
            }
        )

       const isCheck = await RegisterUser.findOne({email:data.email})
       if(!isCheck){
          //   console.log(" Username or password is not correct ! ! ")
          res.status(200).send(" Username or password is not correct ! ! ")
         // 


       }
       else{
        await RegisterUser.deleteOne({email:data.email} )
        await addPersonalDetails.deleteOne({firstName:data.firstName})
        res.clearCookie("jwtToken")
        // console.log("  Account delete Sucessfully ")
        res.redirect('/register')
        // res.status(201).send("Account delete Sucesfully")
        // console.log("I am present after respond the data")

       }
         
    }
    catch(error){
        // console.log("Something Went Wrong Error is :  " + error)
        res.status(500).send("Something Went Wrong !! ")

    }

}



 
// Logout API (clear cookies(TOKEN))
exports.logout= async(req , res)=>{
    try {
        res.clearCookie("jwtToken")
        // console.log("Logout Sucess!! ")
        res.redirect('/login')
        // res.send("You Have Logout Sucessfully !!")

        
    } catch (error) {
        // console.log("Something Went Wrong")
        res.send(error)
        
    }

}


 
// Forgot Password API
exports.forgotPassword = async(req , res)=>{
    try{
        const data = new updateDetails(
            {
                email : req.body.email,

            }
        )
        const userData = await RegisterUser.findOne({email:data.email})
        if(userData){
            const token = randomString.generate()
            console.log(token)
           await RegisterUser.updateOne({email:data.email} ,{$set:{token:token}})
        //    const UserPersonalData = await addPersonalDetails.findOne({email:data.email})
        //    const name =`${UserPersonalData.firstName} ${UserPersonalData.lastName}`
        //    sendResetPasswordMail(name , data.email , randomstring )
        //    sendResetPasswordMail( data.email , randomstring )

           res.send(`<p> Hii   , Please copy the link and <a href="http://localhost:6030/api/reset-password?token=${token}">  reset your password </a>`)


        }
        else{
            console.log("Email is not Defined")
            res.send(" Email is not found !! ")
        }
        

    }
    catch(error){
        console.log("Something Went Wrong : "+ error)
        res.send(error)

    }

}

// Reset Password-API


exports.resetPassword = async (req , res)=>{
    try {
        const token = req.query.token
        console.log(token)
        const tokenData = await RegisterUser.findOne({token:token})
        console.log("token sahi match hua hai")
        if(tokenData){
            res.redirect('/reset-password')
        }

        else{
            console.log("Link has been Expired")
            res.send("Link Has been Expired")
        }


        
    } catch (error) {
        console.log("Something went Wrong : " + error)
        res.send("Something Went Wrong")
        
    }

}


exports.resetPasswordNext =  async (req , res)=>{
    try {
        console.log("Me yha hu reset password ke andar")
        const data = new UpdateDetails({
            _id : req.body._id , 
            password: req.body.password , 
        })
        const Password = data.password
        console.log(Password)
        const newPassword =   bcrypt.hashSync(Password)
        console.log(newPassword)
         
        await RegisterUser.findByIdAndUpdate({_id: data._id} , {$set:{password:newPassword }} , { new:true})
        console.log("Password has been set sucessfully  : ")
        
        res.send(`Password has been set sucessfully <a href="http://localhost:6030/login">  Click here to login  </a>`)
        

        
    } catch (error) {
        console.log("Something went wrong ")
        
    }

     




}

// etherial Mail

//     async function main() {
//         // send mail with defined transport object
//         const info = await transporter.sendMail({
//           from: '"Uvesh ahmed 👻" <foo@example.com>',  
//           to: "uveshahmad30@gmail.com, uveshahmadk@gmail.com",  
//           subject: "Hello Uvesh Bhai✔", 
//           text: "Hello Welcome to the  world of Uvesh Ahmad?",  
//           html: "<b>Hello Uvesh Bhai</b>",  
//         });
      
//         // console.log("Message sent: %s", info.messageId);
//         res.status(201).send(info.messageId)
//  }
//  main().catch( 
   
//     res.status(500).send("Something went Wrong")


//  );





 